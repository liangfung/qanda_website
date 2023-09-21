const linkLoop = new Array(4).fill(1)
export const Footer = () => {
  return (
    <footer className="text-white body-font border-t border-divider bg-[#303846]">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center ">
            <span className="ml-3 text-xl">TabbyML</span>
          </a>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {linkLoop.map((o, index) => (
            <div key={index} className="lg:w-1/4 w-1/2 px-4">
              <h2 className="title-font font-semibold  tracking-widest mb-4">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a>First Link</a>
                </li>
                <li>
                  <a>Second Link</a>
                </li>
                <li>
                  <a>Third Link</a>
                </li>
                <li>
                  <a>Fourth Link</a>
                </li>
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Copyright © 2023 xx, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
