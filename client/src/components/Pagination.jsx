import { Pagination } from "react-bootstrap";

export const Paginate = ({ setLimit, setPage, limit, page, total }) => {
  console.log("limit", limit);
  console.log("page,", page);
  console.log("total", total);
  let active = page;
  const totaNumberOfPages = Math.ceil(total / limit);
  let items = [];

  for (let i = 1; i <= totaNumberOfPages; i++) {
    items.push(
      <li>
        <a
          onClick={() => setPage(i)}
          className={` flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            i === page ? "bg-gray-200" : ""
          }`}
        >
          {i}
        </a>
      </li>

      //   <Pagination.Item
      //     key={i}
      //     active={i === active}
      //     onClick={() => {
      //       setPage(i);
      //     }}
      //   >
      //     {i}
      //   </Pagination.Item>
    );
  }

  if (page === 0 || total === 0) {
    return null;
  }
  return (
    <>
      <>
        <nav aria-label="Page navigation example text-white">
          <ul className="flex items-center -space-x-px h-8 text-sm ">
            <li>
              <a
                disabled={page === 1}
                onClick={() => {
                  page != 1 ? setPage(page - 1) : null;
                }}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>

            {items.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
            <li>
              <a
                disabled={page === totaNumberOfPages}
                onClick={() => {
                  page != totaNumberOfPages ? setPage(page + 1) : null;
                }}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </>
      {/* <div className="flex justify-around container ">
        <div>
          <select
            name=""
            id=""
            onChange={(e) => {
              setLimit(Number(e.target.value));
            }}
          >
            <option value={5}>Limit</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div> */}
    </>
  );
};
