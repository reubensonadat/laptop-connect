Laptop Connect - README
🎯 Project Overview
Laptop Connect is a comprehensive e-commerce platform designed specifically for buying and selling laptops with intelligent course-based recommendations, secure payment processing, and seamless WhatsApp integration. This application uses React with TypeScript and Google Sheets as the database, making it simple to manage inventory without complex backend infrastructure.

🌟 Key Features
Course-Based Recommendations: Intelligent laptop suggestions based on academic requirements
Advanced Search & Filtering: Find laptops by brand, specs, price range, and more
Responsive Design: Optimized for all devices from mobile to desktop
Payment Integration: Secure payment processing with Paystack
WhatsApp Integration: Direct communication with sellers
Google Sheets Database: Easy inventory management without technical knowledge
Real-time Updates: Changes in Google Sheets reflect immediately in the app
🛠️ Technology Stack
Frontend: React 18 with TypeScript (.tsx)
Styling: Tailwind CSS with custom design system
State Management: React hooks (useState, useEffect)
UI Components: Custom components with Lucide React icons
Animations: Framer Motion for smooth transitions
Notifications: Sonner for toast notifications
Database: Google Sheets (no backend required)
Payment: Paystack integration
Deployment: Cloudflare Pages
📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
npm or yarn
A Google account for Google Sheets
A code editor (VS Code recommended)
🚀 Quick Start

1. Clone the Repository
git clone https://github.com/yourusername/laptop-connect.git
cd laptop-connect

2. Install Dependencies
npm install

3. Set Up Google Sheets Database
Follow the detailed Google Sheets setup instructions in the "Database Setup" section below.

4. Configure the Application
Update the Google Sheets URL in src/services/laptopService.ts

// Replace with your Google Sheets CSV URL
const GOOGLE_SHEETS_CSV_URL = 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE';

5. Run the Development Server
npm run dev


Open your browser and navigate to http://localhost:3000 to see the application.

📊 Database Setup (Google Sheets)
Step 1: Create Your Google Sheet
Go to Google Sheets
Create a new spreadsheet
Rename the first sheet to "laptops" (or any name you prefer)
Add the following column headers in the first row:

id,brand,model,processor,ram,storage,graphics,display,condition,price,availability,hasBacklight,hasFingerprint,hasWebcam,hasUsbC,hasHdmi,hasSdCardReader,hasNumericPad,operatingSystem,weight,batteryLife,warranty,material,description,imageUrls,createdAt,updatedAt


Step 2: Add Sample Data
Here's an example row you can use:

id
brand
model
processor
ram
storage
graphics
display
condition
price
availability
hasBacklight
hasFingerprint
hasWebcam
hasUsbC
hasHdmi
hasSdCardReader
hasNumericPad
operatingSystem
weight
batteryLife
warranty
material
description
imageUrls
createdAt
updatedAt
1	Dell	XPS 15	Intel Core i7-11800H	16GB	512GB SSD	NVIDIA RTX 3050	15.6" FHD+	New	7500	TRUE	TRUE	TRUE	TRUE	TRUE	TRUE	TRUE	FALSE	Windows 11	1.8	8 hours	12	Aluminum	High-performance laptop for creative professionals	https://example.com/image.jpg	2023-01-01	2023-01-01

Important Notes:

For boolean values (hasBacklight, hasFingerprint, etc.), use TRUE or FALSE
For availability, use TRUE for in stock and FALSE for out of stock
Make sure each laptop has a unique ID
Image URLs should be direct links to images
Step 3: Publish Your Sheet as CSV
In your Google Sheet, click File > Share > Publish to web
In the "Publish to web" dialog:
Under "Link" tab, select "Comma-separated values (.csv)"
Click Publish
Confirm by clicking OK when prompted
Copy the link provided - this is your CSV URL
Step 4: (Optional) Set Up Google Apps Script
If you prefer JSON over CSV, you can set up a Google Apps Script:

In your Google Sheet, go to Extensions > Apps Script
Paste the following code:


function doGet() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    var headers = data[0];
    var jsonData = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      jsonData.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


Save the script (Ctrl+S or Cmd+S)
Click Deploy > New deployment
Select type: Web app
Execute as: Me
Who has access: Anyone
Click Deploy
Authorize the script when prompted
Copy the Web app URL - this is your JSON API endpoint


📁 Project Structure
laptop-connect/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── LaptopCard.tsx
│   │   ├── LaptopModal.tsx
│   │   ├── CourseRecommendation.tsx
│   │   ├── SearchFilter.tsx
│   │   └── PaymentForm.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── services/           # API services
│   │   └── laptopService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Main app component
│   └── index.tsx           # App entry point
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file



🎨 Customization
Changing the Color Scheme
The application uses a custom color scheme defined in tailwind.config.js. To change the colors:

Open tailwind.config.js
Modify the colors in the theme.extend.colors section
Run npm run dev to see the changes
Adding New Features
To add new features:

Create new components in the src/components directory
Add new pages in the src/pages directory
Update the navigation in src/components/Navigation.tsx
Add routes in src/App.tsx
Modifying the Database Schema
To add new fields to your database:

Add new columns to your Google Sheet
Update the Laptop type in src/types/index.ts
Update the data processing in src/services/laptopService.ts
Update the UI components to display the new fields
🚀 Deployment
Deploying to Cloudflare Pages
Push your code to a GitHub repository
Go to the Cloudflare Pages dashboard
Click "Create a project"
Connect your GitHub account
Select your repository
Configure build settings:
Build command: npm run build
Build output directory: dist
Click "Save and Deploy"
Your site will be deployed and available at a .pages.dev URL
Environment Variables
If you need to use environment variables (e.g., for payment keys):

Create a .env.local file in your project root
Add your variables:

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
WHATSAPP_PHONE_NUMBER=your_whatsapp_number


Update your Cloudflare Pages environment variables in the dashboard
📝 How to Update Your Inventory
Adding New Laptops
Open your Google Sheet
Add a new row with the laptop details
Make sure to:
Use a unique ID
Fill in all required fields
Use TRUE/FALSE for boolean values
Use valid image URLs
Save the sheet
The changes will appear in your application immediately
Updating Existing Laptops
Open your Google Sheet
Find the row for the laptop you want to update
Make your changes
Save the sheet
The changes will appear in your application immediately
Removing Laptops
Open your Google Sheet
Delete the row for the laptop you want to remove
Save the sheet
The laptop will no longer appear in your application
🔧 Troubleshooting
Common Issues
"TypeError: Cannot read properties of null (reading 'getSheetByName')"
This error occurs when the Google Apps Script can't access your spreadsheet. To fix:

Make sure you're using the correct spreadsheet ID
Check that your sheet has the correct name
Try republishing your script
"No data found in sheet"
This error occurs when your sheet is empty or has no data. To fix:

Make sure your sheet has at least one row of data
Check that your column headers match exactly
Try refreshing the page
CORS Errors
If you see CORS errors in the browser console:

Make sure your Google Apps Script includes the CORS header:
.setHeader("Access-Control-Allow-Origin", "*");


Try using the CSV approach instead of the Google Apps Script
Images Not Loading
If your images aren't loading:

Make sure your image URLs are correct and accessible
Try opening the image URLs in a new tab to verify they work
Check that your URLs don't have any special characters that need to be encoded
Getting Help
If you're still having issues:

Check the browser console for error messages
Make sure your Google Sheet is properly formatted
Verify that your CSV or JSON URL is accessible
Try using the mock data approach to isolate the issue
🎯 Course-Based Recommendation System
The application includes an intelligent recommendation system that suggests laptops based on academic requirements. Here's how it works:

Supported Courses
Computer Science / IT
Requirements: i5/Ryzen 5+, 8GB+ RAM, SSD preferred
Use Cases: Programming, virtual machines, software development
Budget Range: ₵3,500 - ₵8,000
Business / Economics
Requirements: i3/Ryzen 3+, 8GB RAM, SSD/HDD
Use Cases: Office applications, presentations, data analysis
Budget Range: ₵2,500 - ₵5,000
Graphic Design / Arts
Requirements: i5/Ryzen 5+, 16GB+ RAM, dedicated graphics
Use Cases: Adobe Creative Suite, video editing, 3D modeling
Budget Range: ₵5,000 - ₵10,000
Engineering / Architecture
Requirements: i7/Ryzen 7+, 16GB+ RAM, dedicated graphics required
Use Cases: CAD software, simulations, 3D modeling
Budget Range: ₵6,000 - ₵12,000
Medicine / Life Sciences
Requirements: i5/Ryzen 5+, 8GB+ RAM, lightweight preferred
Use Cases: Research software, medical applications
Budget Range: ₵3,500 - ₵7,000
Law / Humanities
Requirements: i3/Ryzen 3+, 8GB RAM, portable preferred
Use Cases: Legal research, document management, writing
Budget Range: ₵2,500 - ₵4,500
General Studies
Requirements: i5/Ryzen 5+, 8GB RAM, balanced specs
Use Cases: General coursework, multimedia, future flexibility
Budget Range: ₵3,000 - ₵6,000
Customizing Course Recommendations
To modify the course recommendations:

Open src/components/CourseRecommendation.tsx
Update the courses array with your custom requirements
Adjust the recommendation algorithm in the getRecommendations function
💳 Payment Integration
The application includes integration with Paystack for secure payment processing. Here's how to set it up:

Setting Up Paystack
Create a Paystack account at paystack.co
Get your public key from the dashboard
Add it to your environment variables:

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key


Customizing Payment Options
To modify the payment options:

Open src/components/PaymentForm.tsx
Update the payment types and processing logic
Customize the form fields as needed
📱 Mobile Responsiveness
The application is fully responsive and optimized for mobile devices. Here are some key features:

Mobile-first design approach
Touch-friendly interface elements
Optimized images for faster loading
Collapsible navigation menu
Responsive grid layouts
🔒 Security Considerations
While this application is designed to be simple and user-friendly, it's important to consider security:

Never expose sensitive data in your Google Sheet
Use HTTPS for all API endpoints
Validate all user inputs
Keep your dependencies up to date
Consider implementing rate limiting for your API
🚀 Future Enhancements
Here are some potential future enhancements for the application:

User Accounts: Personalized experience with saved preferences
Wishlist: Allow users to save favorite laptops
Reviews: Customer feedback system
Comparison Tool: Side-by-side laptop comparison
Advanced Filtering: More granular filter options
Inventory Management: Admin dashboard for managing stock
Email Notifications: Order status updates
Analytics: Track user behavior and sales
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

📞 Support
If you have any questions or need help, please:

Check this README for common solutions
Search existing issues on GitHub
Create a new issue with detailed information
Contact us at laptopconnect@gmail.com
Thank you for using Laptop Connect! We hope this application helps you find the perfect laptop for your needs.