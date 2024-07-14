import { useSelector } from "react-redux";

export const Home = () => {
  const { users, total } = useSelector((state) => state.users);

  return (
    <div>
      <div className="w-full overflow-x-hidden border  flex flex-col ">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Dashboard</h1>

          <div className="flex flex-wrap mt-6">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
              <p className="text-xl pb-3 flex items-center">
                <i className="fa fa-users mr-3 text-3xl "></i>
                {total - 1}+ USERS
              </p>
              <div className="p-6 bg-white"></div>
            </div>
          </div>

          <div className="w-full mt-12">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-list mr-3"></i> Latest Reports
            </p>
            <div className="bg-white overflow-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Last name
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Lian</td>
                    <td className="w-1/3 text-left py-3 px-4">Smith</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Emma</td>
                    <td className="w-1/3 text-left py-3 px-4">Johnson</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Oliver</td>
                    <td className="w-1/3 text-left py-3 px-4">Williams</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Lian</td>
                    <td className="w-1/3 text-left py-3 px-4">Smith</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Emma</td>
                    <td className="w-1/3 text-left py-3 px-4">Johnson</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Oliver</td>
                    <td className="w-1/3 text-left py-3 px-4">Williams</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
