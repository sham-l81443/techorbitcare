import React from 'react'

const StoreHours = () => {
  return (
    <div className="bg-gray-50 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold text-black mb-4">
        Store Hours
      </h3>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Monday - Friday</span>
          <span>8:00 AM - 8:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Saturday</span>
          <span>9:00 AM - 6:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunday</span>
          <span>10:00 AM - 5:00 PM</span>
        </div>
      </div>
    </div>
  )
}

const ContactInfo = () => {
  return (
    <div className="bg-gray-50 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold text-black mb-4">
        Contact Info
      </h3>
      <div className="space-y-4 text-gray-600">
        <div>
          <div className="font-medium text-black">Phone</div>
          <div>{process.env.NEXT_PUBLIC_CALL_NUMBER || "9020664466"}</div>
        </div>
        <div>
          <div className="font-medium text-black">Email</div>
          <div>{process.env.NEXT_PUBLIC_EMAIL || "techorbitcare@gmail.com"}</div>
        </div>
        <div>
          <div className="font-medium text-black">Address</div>
          <div>
            {process.env.NEXT_PUBLIC_ADDRESS || "Near Police Station, Court Road, Taliparamba, Kerala"}
          </div>
        </div>
      </div>
    </div>
  )
}

const StoreImage = () => {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
        alt="Modern store interior"
        className="w-full h-full object-cover rounded-3xl shadow-2xl min-h-96"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
      <div className="absolute bottom-8 left-8 text-white">
        <h4 className="text-2xl font-semibold mb-2">
          Premium Experience
        </h4>
        <p className="text-gray-200">
          Clean, modern, and professional environment
        </p>
      </div>
    </div>
  )
}

const VisitStore = () => {
  return (
    <section className="py-20 px-6 bg-white max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
            Visit Our Store
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our premium service in person at our state-of-the-art facility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <StoreHours />
            <ContactInfo />
          </div>
          
          <StoreImage />
        </div>
      </div>
    </section>
  )
}

export default VisitStore