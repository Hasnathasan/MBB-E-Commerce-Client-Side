import { Link } from "react-router-dom";
import useProductLength from "../../../Hooks/useProductLength";
import cubes from "../../../assets/cubes.png";
import packages from "../../../assets/package.png";
import team from "../../../assets/team.png";
import Chart from "react-apexcharts";
import useUsersByRole from "../../../Hooks/useUsersByRole";
import useOrdersLength from "../../../Hooks/useOrdersLength";
import Loader from "../../../Components/Loader/Loader";
import useOrdersCountByMonth from "../../../Hooks/useOrdersCountByMonth";
import useProductCountFormOrderByMonth from "../../../Hooks/useProductCountFormOrderByMonth";
const OverView = () => {
  const [productsLength, isProductsLengthLoading] = useProductLength();
  const [ordersLength, isOrdersLengthLoading] = useOrdersLength();
  const [usersByRole, isUsersByRoleDataLoading] = useUsersByRole();
  const [ordersByMonth, isOrdersByMonthLoading] = useOrdersCountByMonth();
  const [soldProductByMonth, isSoldProductByMonthLoading] = useProductCountFormOrderByMonth();
  if (
    isProductsLengthLoading ||
    isUsersByRoleDataLoading || isOrdersByMonthLoading || isSoldProductByMonthLoading ||
    isOrdersLengthLoading
  ) {
    return <Loader></Loader>;
  }
  console.log(ordersByMonth);
  
  var options = {
    chart: {
      height: 200,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "month",
      categories:  Object.keys(ordersByMonth),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  const series = [
    {
      name: "Total Orders",
      data: Object.values(ordersByMonth),
    },
    {
      name: "Product sold",
      data: Object.values(soldProductByMonth),
    },
  ];
  var optionsForPie = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: ["Customer", "Artist", "Admin"],
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 350,
          },
          legend: {
            height: 30,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 18,
    },
  };
  const seriseForDonut = [
    usersByRole?.user || 0,
    usersByRole?.artist || 0,
    usersByRole?.admin || 0,
  ];
  return (
    <div className="w-[97%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-5 justify-center">
        <div className="w-full p-3 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4 bg-[#008ffb] !text-white">
          <img className="w-8" src={cubes} alt="" />
          <div>
            <h2 className="text-white text-nowrap md:text-base font-bold ">
              Total Products: {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold  md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full p-3 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4  bg-[#2dcf99]">
          <img className="w-8" src={packages} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Orders: {ordersLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/orders"}
              className="text-white font-bold  md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Customers: {usersByRole?.user}
            </h2>
            <Link
              to={"/adminDashboard/customers"}
              className="text-white font-bold   md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Artists: {usersByRole?.artist}
            </h2>
            <Link
              to={"/adminDashboard/artists"}
              className="text-white font-bold text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-12">
        <div className="bg-white lg:col-span-4 pt-12 md:pt-0 col-span-12 max-w-80 p-4 flex flex-col justify-center relative w-full h-full items-center rounded-md shadow-md">
          <h2 className="text-xl absolute top-4 text-center font-semibold">
            User's in Chart
          </h2>
          <Chart
            options={optionsForPie}
            series={seriseForDonut}
            type="donut"
            width="120%"
          />
        </div>
        <div className="bg-white p-3 lg:col-span-8 col-span-12 rounded-md shadow-md">
          <h3 className="font-semibold p-2 text-gray-800">
            Product Selling Update
          </h3>
          <Chart options={options} series={series} type="area" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default OverView;
