import React from "react";

const UserDetails = () => {
  return (
    <section className="main-body w-full py-24 bg-gray-100">
      <div className="main-container w-full">
        <ul
          className="nav justify-center nav-pills mb-3 w-11/12 mx-auto"
          id="pills-tab"
          role="tablist"
        >
          {[
            {
              id: "pills-dashboard",
              label: "Dashboard",
              icon: "fa-home",
              active: true,
            },
            { id: "pills-orders", label: "Orders", icon: "fa-file" },
            { id: "pills-downloads", label: "Downloads", icon: "fa-download" },
            { id: "pills-address", label: "Address", icon: "fa-map-marker" },
            { id: "pills-adetails", label: "Account Details", icon: "fa-user" },
            {
              id: "pills-logout",
              label: "Logout",
              icon: "fa-sign-out",
              logout: true,
            },
          ].map((tab) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <button
                className={`nav-link ${tab.active ? "active" : ""}`}
                id={`${tab.id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#${tab.id}`}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={tab.active}
                disabled={tab.logout}
              >
                <a className={tab.logout ? "logout" : ""}>
                  {tab.label}
                  <i className={`fa fa-lg ${tab.icon}`}></i>
                </a>
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content w-11/12 mx-auto" id="pills-tabContent">
          <div
            className="tab-pane fade show active justify-content-center"
            id="pills-dashboard"
            role="tabpanel"
            tabIndex="0"
          >
            <div className="tab-heading text-2xl font-bold text-gray-800 mb-5">
              Dashboard
            </div>
            <div className="tab-text-area">
              <p className="text-gray-600 text-lg">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </p>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-orders"
            role="tabpanel"
            tabIndex="0"
          >
            <div className="tab-heading text-2xl font-bold text-gray-800 mb-5">
              Orders
            </div>
            <div className="tab-text-area">
              <table className="border-2 border-gray-400 w-full text-center">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Order No.</th>
                    <th className="border border-gray-400 p-2">Date</th>
                    <th className="border border-gray-400 p-2">Status</th>
                    <th className="border border-gray-400 p-2">Total</th>
                    <th className="border border-gray-400 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      orderNo: 1,
                      date: "2023/3/8",
                      status: "Pending",
                      total: "Rs 1932",
                    },
                    {
                      orderNo: 2,
                      date: "2023/2/28",
                      status: "On Hold",
                      total: "Rs 1080",
                    },
                    {
                      orderNo: 3,
                      date: "2023/1/14",
                      status: "Approved",
                      total: "RS 8900",
                    },
                  ].map((order) => (
                    <tr key={order.orderNo} className="hover:bg-gray-200">
                      <td className="border border-gray-400 p-2">
                        {order.orderNo}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {order.date}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {order.status}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {order.total}
                      </td>
                      <td className="border border-gray-400 p-2">
                        <a
                          className="text-green-600 hover:text-blue-600"
                          href="#"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-downloads"
            role="tabpanel"
            aria-labelledby="pills-downloads-tab"
            tabIndex="0"
          >
            <div className="tab-heading text-2xl font-bold text-gray-800 mb-5">
              Downloads
            </div>
            <div className="tab-text-area">
              <table className="border-2 border-gray-400 w-full text-center">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Product</th>
                    <th className="border border-gray-400 p-2">Downloads</th>
                    <th className="border border-gray-400 p-2">Expires</th>
                    <th className="border border-gray-400 p-2">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      product: "Juicyfy Product list",
                      downloads: "2022/11/8",
                      expires: "Expired",
                    },
                    {
                      product: "Juicify Product images",
                      downloads: "2023/1/10",
                      expires: "2023/9/17",
                    },
                  ].map((download, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="border border-gray-400 p-2">
                        {download.product}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {download.downloads}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {download.expires}
                      </td>
                      <td className="border border-gray-400 p-2">
                        <a
                          className="text-green-600 hover:text-blue-600"
                          href="#"
                        >
                          Click to Download your File
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-address"
            role="tabpanel"
            aria-labelledby="pills-address-tab"
            tabIndex="0"
          >
            <div className="tab-heading text-2xl font-bold text-gray-800 mb-5">
              Billing Address
            </div>
            <div className="tab-text-area">
              <p>Bangalamukhi-Sankhamul Rd,</p>
              <p>Lalitpur 44600</p>
              <p>
                <span className="font-semibold">Mobile: </span>(+977)XXXXXXXXXX
              </p>
            </div>
          </div>
          <div
            className="tab-pane fade bg-gray-100"
            id="pills-adetails"
            role="tabpanel"
            aria-labelledby="pills-adetails-tab"
            tabIndex="0"
          >
            <div className="tab-heading text-2xl font-bold text-gray-800 mb-5">
              Account Details
            </div>
            <div className="tab-text-area">
              <form>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      label: "First Name",
                      type: "text",
                      placeholder: "First Name",
                    },
                    {
                      label: "Last Name",
                      type: "text",
                      placeholder: "Last Name",
                    },
                    {
                      label: "Phone Number",
                      type: "number",
                      placeholder: "Phone number",
                    },
                    { label: "Address", type: "text", placeholder: "Address" },
                    {
                      label: "Email Address",
                      type: "email",
                      placeholder: "Email address",
                    },
                    {
                      label: "Password",
                      type: "password",
                      placeholder: "Password",
                    },
                    {
                      label: "Confirm Password",
                      type: "password",
                      placeholder: "Confirm Password",
                    },
                  ].map((input, index) => (
                    <div key={index}>
                      <h6 className="text-gray-600">{input.label}</h6>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        className="border border-gray-300 p-3 w-full mb-4"
                      />
                    </div>
                  ))}
                  <h6 className="text-gray-600">Description</h6>
                  <textarea
                    rows="5"
                    placeholder="Description"
                    className="border border-gray-300 p-3 w-full mb-4"
                  ></textarea>
                  <div>
                    <input
                      type="submit"
                      className="my-button bg-green-600 text-white py-3 px-6"
                      value="Save Now"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
