import React from 'react'

export default function Introduction() {
  return (
    <>
      <h1 className='pt-10 tracking-tighter font-semibold'>
        Manage your projects for free!
      </h1>
      <div className='benefits-list'>
        <h3 className='tracking-tighter font-medium'>
          Try <span className='text-gradient'>ProjectMan</span> and...
        </h3>
        <p>
          <span className='text-green-300 bg-green-700 rounded-sm px-2 '>
            GET
          </span>{' '}
          See all your projects
        </p>
        <p>
          <span className='text-yellow-300 bg-yellow-700 rounded-sm px-2 '>
            POST
          </span>{' '}
          Add a project
        </p>
        <p>
          <span className='text-purple-300 bg-purple-700 rounded-sm px-2 '>
            PATCH
          </span>{' '}
          Update an existing project
        </p>
        <p>
          <span className='text-red-300 bg-red-700 rounded-sm px-2 '>
            DELETE
          </span>{' '}
          Remove a project
        </p>
      </div>
      <div className='info-card'>
        <div className='flex items-center gap-2'>
          <i className='fa-solid fa-circle-info'></i>
          <h3 className='font-chakra'>Did you know...</h3>
        </div>
        <h5>That you can fetch directly from the backend?</h5>
        <p>
          This means that you can send a request to this API and get a response
          that you can use for example in your personal portfolio!
        </p>
      </div>
    </>
  )
}
