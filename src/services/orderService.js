import { supabase } from '../lib/supabase';

export const createOrder = async (orderData, cartItems) => {
    try {
        // 1. Handle Customer (Find or Create)
        let customerId = null;
        const { data: customer, error: customerError } = await supabase
            .from('customers')
            .select('id')
            .eq('phone', orderData.customerPhone)
            .single();

        if (customer) {
            customerId = customer.id;
            // Update location if changed
            await supabase.from('customers').update({ 
                location: orderData.deliveryLocation,
                name: orderData.customerName 
            }).eq('id', customerId);
        } else {
            const { data: newCustomer, error: createError } = await supabase
                .from('customers')
                .insert([{
                    name: orderData.customerName,
                    phone: orderData.customerPhone,
                    location: orderData.deliveryLocation
                }])
                .select()
                .single();
            if (newCustomer) customerId = newCustomer.id;
        }

        // 2. Create Order Header
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                order_number: orderData.orderNumber,
                customer_id: customerId,
                customer_name: orderData.customerName,
                customer_phone: orderData.customerPhone,
                total_amount: orderData.total,
                delivery_method: orderData.deliveryMethod,
                delivery_location: orderData.deliveryLocation
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Create Order Items
        const orderItems = cartItems.map(item => ({
            order_id: order.id,
            product_id: String(item.id).includes('P') ? null : item.id, // Handle mock IDs
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            unit_cost: item.cost_price || 0
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { success: true, order };
    } catch (error) {
        console.error('Order creation error:', error);
        return { success: false, error };
    }
};

export const fetchOrders = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (*)
        `)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const updateOrderStatus = async (orderId, status) => {
    const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);
    
    if (error) throw error;
    return true;
};
