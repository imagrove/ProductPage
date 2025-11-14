# Product Store - Next.js E-commerce Website

A modern e-commerce website built with Next.js 14.2.15, TinaCMS, Snipcart, and integrated with Alipay payments.

## 🚀 Features

- **Modern Frontend**: Built with Next.js 14.2.15 and React 18
- **Content Management**: TinaCMS 1.6.38 for easy content editing
- **E-commerce**: Snipcart integration for shopping cart functionality
- **Payment Methods**: Credit/debit cards via Snipcart + Alipay integration
- **Contact Forms**: Formspree integration for contact form handling
- **Analytics**: Google Analytics integration
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **SEO Optimized**: Built-in SEO optimization

## 📋 Pages

- ✅ **Home Page**: Hero section, featured products, company highlights
- ✅ **Products Page**: Product listing with shopping cart integration
- ✅ **Product Detail Page**: Individual product pages (via TinaCMS)
- ✅ **Shopping Cart**: Cart management with Snipcart
- ✅ **Checkout Page**: Payment processing with multiple payment methods
- ✅ **About Us**: Company information and values
- ✅ **Contact Us**: Contact form with Formspree integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.15 (LTS)
- **Content Management**: TinaCMS 1.6.38
- **Styling**: Tailwind CSS 3
- **E-commerce**: Snipcart
- **Forms**: Formspree React
- **Analytics**: Google Analytics
- **Payments**: Alipay Global integration
- **Deployment**: Vercel

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd product-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Copy `.env.local.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# TinaCMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token

# Snipcart Configuration
NEXT_PUBLIC_SNIPCART_API_KEY=your-snipcart-api-key

# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your-formspree-endpoint

# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your-google-analytics-id

# Alipay Configuration
ALIPAY_APP_ID=your-alipay-app-id
ALIPAY_PRIVATE_KEY=your-alipay-private-key
ALIPAY_PUBLIC_KEY=alipay-public-key
NEXT_PUBLIC_ALIPAY_GATEWAY_URL=https://openapi.alipay.com/gateway.do
```

### TinaCMS Setup

1. Visit [TinaCMS](https://tina.io/) and create an account
2. Create a new project and get your `clientId` and `token`
3. Add them to your `.env.local` file
4. Access the CMS at `http://localhost:3000/admin/index.html`

### Snipcart Setup

1. Sign up at [Snipcart](https://snipcart.com/)
2. Get your API key from the dashboard
3. Configure payment methods in your Snipcart account
4. Add the API key to your `.env.local` file

### Formspree Setup

1. Create an account at [Formspree](https://formspree.io/)
2. Create a new form and get the endpoint URL
3. Add the endpoint to your `.env.local` file

### Alipay Setup

1. Register for an Alipay Global merchant account
2. Get your app ID and API credentials
3. Configure webhook URLs in your Alipay dashboard
4. Add credentials to your `.env.local` file

## 📱 Usage

### Adding Products via TinaCMS

1. Navigate to the CMS at `/admin/index.html`
2. Click on "Products" in the sidebar
3. Click "Create New" to add a new product
4. Fill in the product details (name, description, price, image, SKU, stock)
5. Save and publish your changes

### Managing Content

- **Products**: Add/edit product information through TinaCMS
- **Pages**: Edit page content through TinaCMS
- **Images**: Upload and manage images through TinaCMS media library

### Shopping Cart

- Add products to cart using the "Add to Cart" buttons
- View cart by clicking the cart icon in the header
- Proceed to checkout from the cart page
- Choose payment method (Credit Card or Alipay)

### Contact Form

- Fill out the contact form on the Contact page
- Messages are sent via Formspree to your configured email
- Form includes validation and success/error handling

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables to your Vercel deployment:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_SNIPCART_API_KEY`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- `NEXT_PUBLIC_GA_TRACKING_ID`
- `ALIPAY_APP_ID`
- `ALIPAY_PRIVATE_KEY`
- `ALIPAY_PUBLIC_KEY`

## 🔒 Security

- All API keys are stored in environment variables
- Payment processing is handled securely through Snipcart and Alipay
- Form submissions are processed through Formspree
- HTTPS is enforced for all payment-related communications

## 📞 Support

For support, please contact us through the contact form on the website or email us at info@productstore.com.

## 📄 License

This project is licensed under the MIT License.
