import './OrderHistory.css';

const OrderHistory = () => {
    
    return (
        <div className='border rounded-lg overflow-auto border-gray-300'>
            <h4 className='p-4 text-lg font-semibold'>Order History</h4>
                <table className='overflow-auto'>
                    <tr>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>#2233</td>
                        <td>27 Mar, 2021</td>
                        <td>$250.00 (4 Products)</td>
                        <td>Completed</td>
                        <td className="text-green-500 font-semibold">View Details</td>
                    </tr>
                    <tr>
                        <td>#2233</td>
                        <td>27 Mar, 2021</td>
                        <td>$250.00 (4 Products)</td>
                        <td>Completed</td>
                        <td className="text-green-500 font-semibold">View Details</td>
                    </tr>
                    <tr>
                        <td>#2233</td>
                        <td>27 Mar, 2021</td>
                        <td>$250.00 (4 Products)</td>
                        <td>Completed</td>
                        <td className="text-green-500 font-semibold">View Details</td>
                    </tr>
                    <tr>
                        <td>#2233</td>
                        <td>27 Mar, 2021</td>
                        <td>$250.00 (4 Products)</td>
                        <td>Completed</td>
                        <td className="text-green-500 font-semibold">View Details</td>
                    </tr>
                </table>
        </div>
    );
};

export default OrderHistory;