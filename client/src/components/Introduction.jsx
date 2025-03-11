import React from 'react'

export default function Introduction() {
  // Object to store HTTP method details
  const methods = {
    GET: {
      text: 'text-green-300',
      bg: 'bg-green-700',
      info: 'See all your projects',
    },
    POST: {
      text: 'text-yellow-300',
      bg: 'bg-yellow-700',
      info: 'Add a project',
    },
    PATCH: {
      text: 'text-purple-300',
      bg: 'bg-purple-700',
      info: 'Update an existing project',
    },
    DELETE: {
      text: 'text-red-300',
      bg: 'bg-red-700',
      info: 'Remove a project',
    },
  }
  return (
    <>
      {/* Main heading */}
      <h1 className='pt-10 tracking-tighter font-semibold'>
        Manage your projects for free!
      </h1>

      {/* List of benefits */}
      <div className='benefits-list'>
        <h3 className='tracking-tighter font-medium'>
          Try <span className='text-gradient'>ProjectMan</span> and...
        </h3>
        {Object.entries(methods).map(([method, { text, bg, info }]) => {
          return (
            <p key={method}>
              <span className={`${text} ${bg} rounded-sm px-2`}>{method}</span>{' '}
              {info}
            </p>
          )
        })}
      </div>

      {/* Info card about backend capabilities */}
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
