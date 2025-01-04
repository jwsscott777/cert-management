import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="container mx-auto p-8 text-gray-800">
      <h1 className="text-4xl font-bold text-amber-700 text-center mb-8">About This Site</h1>
      <p className="mb-6 text-blue-500">
        Welcome to the Certificate Manager! This platform is designed to help you easily keep track of student certificates, manage updates, and maintain records efficiently. Whether you're a teacher, administrator this app makes it simple to organize and manage all your certificates in one place.
      </p>

      <h2 className="text-2xl font-bold text-blue-500 mt-6 mb-4">How to Use the Site</h2>

      <div className="space-y-6">
        {/* Adding Certificates */}
        <div>
          <h3 className="text-xl font-bold text-amber-600">Adding Certificates</h3>
          <p className='text-blue-500'>
            To add a new certificate, navigate to the <strong>"Add Certificate"</strong> page using the navigation menu. Fill out the form with the required details:
          </p>
          <ul className="list-disc list-inside ml- text-blue-500">
            <li><strong>Title:</strong> The name of the certificate.</li>
            <li><strong>Description:</strong> A brief summary of the certificate.</li>
            <li><strong>Status:</strong> Mark whether the certificate is completed or pending.</li>
          </ul>
          <p className='text-blue-500'>Once you've completed the form, click the <strong>"Submit"</strong> button to save the certificate to your records.</p>
        </div>

        {/* Editing Certificates */}
        <div>
          <h3 className="text-xl font-bold text-green-600">Editing Certificates</h3>
          <p className='text-blue-500'>
            To edit a certificate, go to the <strong>"Recent Certificates"</strong> page, where you'll see a list of all your certificates. Click the <strong>Edit</strong> button (represented by a pencil icon) next to the certificate you wish to modify. Update the details as needed and click <strong>"Save Changes"</strong>.
          </p>
        </div>

        {/* Removing Certificates */}
        <div>
          <h3 className="text-xl font-bold text-red-600">Removing Certificates</h3>
          <p className='text-blue-500'>
            To delete a certificate, navigate to the <strong>"Recent Certificates"</strong> page. Locate the certificate you wish to remove and click the <strong>Delete</strong> button (represented by a trash can icon). You'll be asked to confirm the deletion to prevent accidental removal.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-blue-500">
          If you have any questions or need assistance, feel free to contact me. I'm here to help!
        </p>
        <p className="text-lg text-green-500">james.scott@browardschools.com</p>
      </div>
      <div>
      <Image
                            className="object-contain rounded-md"
                            src={"/Illustration 5.svg"}
                            alt="Hero SupaTodo Image"
                            
                            width={650}
                            height={650}
                            
                        />
      </div>
    </div>
  );
};

export default About;
