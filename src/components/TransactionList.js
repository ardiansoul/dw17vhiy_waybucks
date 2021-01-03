import Axios from "axios";
import { useMutation } from "react-query";
import { baseUrl } from "../Utils/API";
import TransactionItem from "./TransactionItem";

function TransactionList({ refetch, transactions, setAlert }) {
  const [mutate] = useMutation(({ id, status }) =>
    Axios({
      method: "put",
      url: `${baseUrl}api/v1/transaction/${id}`,
      data: { status: status },
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    })
  );

  const handleButton = async (status, id) => {
    try {
      let data = { id, status };
      await mutate(data, {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (data) => {
          refetch();
          setAlert(status);
        },
      });
    } catch (err) {
      console.log(id);
    }
  };
  return (
    <>
      <table className="w-full mt-6">
        <tr className="bg-red-800 h-10 text-white">
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>Post Code</th>
          <th>Income</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {transactions.map((transaction, index) => {
          return (
            <TransactionItem
              transaction={transaction}
              index={index}
              handleButton={handleButton}
            />
          );
        })}
      </table>
    </>
  );
}

export default TransactionList;
