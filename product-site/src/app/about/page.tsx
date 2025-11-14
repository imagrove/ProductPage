// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Product Store, your trusted destination for quality products and exceptional customer service. 
            We are passionate about providing our customers with the best shopping experience possible.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to deliver high-quality products that enhance your daily life. We carefully curate our 
            selection to ensure that every item meets our strict standards for quality, functionality, and value.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Quality Assurance:</strong> Every product is thoroughly tested and vetted</li>
            <li><strong>Fast Shipping:</strong> We offer worldwide shipping with tracking</li>
            <li><strong>Customer Support:</strong> Our dedicated team is here to help you</li>
            <li><strong>Secure Payments:</strong> Multiple payment options including international methods</li>
            <li><strong>Satisfaction Guarantee:</strong> Easy returns and exchanges</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Customer First</h3>
              <p className="text-gray-700">
                Your satisfaction is our top priority. We strive to exceed your expectations 
                with every interaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Quality Focus</h3>
              <p className="text-gray-700">
                We never compromise on quality. Every product in our catalog is selected 
                with care and attention to detail.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-700">
                We continuously seek out innovative products that solve real problems 
                and improve your daily life.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Global Reach</h3>
              <p className="text-gray-700">
                We serve customers worldwide with international shipping and 
                multi-currency support.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or need assistance? We're here to help! Reach out to us through our 
            <a href="/contact" className="text-blue-600 hover:underline"> contact form</a> 
            and we'll get back to you within 24 hours.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-2">Business Information</h3>
            <p className="text-gray-700">
              <strong>Email:</strong> info@productstore.com<br />
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (EST)<br />
              <strong>Response Time:</strong> Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}