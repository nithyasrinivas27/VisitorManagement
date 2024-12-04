import './VisitorTable.css'
const VisitorTable = ({visitors}) => {
  console.log(visitors)
  return (
    <>
      <div className="table-container">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Purpose
              </th>
              <th scope="col" className="px-6 py-3">
                Proof ID
              </th>
              <th scope="col" className="px-6 py-3">
                Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Photo
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr
                key={visitor._id}
                className="bg-white border-b light"
              >
                <td className="px-6 py-4">{visitor?.name}</td>
                <td className="px-6 py-4">{visitor?.address}</td>
                <td className="px-6 py-4">{visitor?.email}</td>
                <td className="px-6 py-4">{visitor?.purpose}</td>
                <td className="px-6 py-4">{visitor?.proofId}</td>
                <td className="px-6 py-4">{visitor?.employeeId?.name}</td>
                <td
                  className={`px-6 py-4 status ${visitor.status.toLowerCase()}`}
                >
                  {visitor?.status}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={visitor?.photo || `${process.env.PUBLIC_URL}/assets/img-placeholder.jpg`}
                    alt="Visitor"
                    className="visitor-photo"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default VisitorTable;
