import { Link } from "react-router-dom";
import useProductLength from "../../../Hooks/useProductLength";
import cubes from "../../../assets/cubes.png";
import packages from "../../../assets/package.png";
import team from "../../../assets/team.png";
import Chart from "react-apexcharts";
import useUsersByRole from "../../../Hooks/useUsersByRole";
const OverView = () => {
  const [productsLength, isProductsLengthLoading] = useProductLength();
  const [usersByRole, isUsersByRoleDataLoading] = useUsersByRole();
  if (isProductsLengthLoading || isUsersByRoleDataLoading) {
    return <h1>Loading</h1>;
  }
  console.log(usersByRole);
  var options = {
    chart: {
    height: 200,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'month',
    categories: ["jan", "Feb", "Mar", "April", "May", "Jun", "july", "Aug", "sep", "Oct", "Nov", "Dec" ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  };
  const series = [{
    name: 'Product selled',
    data: [31, 40, 28, 51, 42, 109, 100, 110, 90, 140, 150, 155]
  }, {
    name: 'Product canceled',
    data: [11, 32, 45, 32, 34, 52, 70, 150, 50, 100, 57, 70]
  }]
  var optionsForPie = {
    chart: {
    width: 380,
    type: 'donut',
  },
  labels: ["Customer", "Artist", "Admin"],
  dataLabels: {
    enabled: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 350
      },
      legend: {
        height: 30,
      }
    }
  }],
  legend: {
    position: 'bottom',
    offsetY: 0,
    height: 18,
  }
  };
  const seriseForDonut = [usersByRole?.user, usersByRole?.artist, usersByRole?.mbbAdmin];
  return (
    <div className="w-[97%] mx-auto">
      <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-5 justify-center">
        <div className="w-full p-1 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4 bg-[#008ffb] !text-white">
          <img className="w-5 md:w-8 xl:w-8" src={cubes} alt="" />
          <div>
            <h2 className="text-white text-nowrap text-[10px] md:text-base font-bold ">
              Total Products - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold text-[8px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full p-3 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4  bg-[#2dcf99]">
          <img className="w-3 md:w-8 xl:w-8" src={packages} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Orders - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/orders"}
              className="text-white font-bold  text-[10px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-3 md:w-8 xl:w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Customers - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/customers"}
              className="text-white font-bold  text-[10px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-3 md:w-8 xl:w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Artists - {productsLength?.length}
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
      <div className="bg-white col-span-4 max-w-80 p-4 flex flex-col justify-center relative w-full h-full items-center rounded-md shadow-md">
        <h2 className="text-xl absolute top-4 text-center font-semibold">User's in Chart</h2>
           <Chart
              options={optionsForPie}
              series={seriseForDonut}
              type="donut"
              width="120%"
            />
           </div>
           <div className="bg-white p-3 col-span-8 rounded-md shadow-md">
            <h3 className="font-semibold p-2 text-gray-800">Product Selling Update</h3>
           <Chart
              options={options}
              series={series}
              type="area"
              width="100%"
            />
           </div>
      </div>
    </div>
  );
};

export default OverView;
