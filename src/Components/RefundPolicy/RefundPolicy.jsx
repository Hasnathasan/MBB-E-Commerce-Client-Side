import useSystemInfo from "../../Hooks/useSystemInfo";
import "./RefundPolicy.css";

const RefundPolicy = () => {
  const [systemInfo] = useSystemInfo();
  return (
    <div className="refund_policy mb-9 mx-2 md:mx-8">
      <h1>RETURN POLICY</h1>
      <h4>Last updated April 07, 2024</h4>
      <h2>REFUNDS</h2>
      <h4>All sales are final and no refund vill be issued.</h4>
      <h2>QUESTIONS</h2>
      <h3>
        If you have any questions concerning our return policy, please contact
        us at
      </h3>
      <h4>{systemInfo?.[0]?.email}</h4>
    </div>
  );
};

export default RefundPolicy;
