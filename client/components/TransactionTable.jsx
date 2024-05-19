import { useTrans } from "../contexts/TransactionsContext";
import Loader from "./Loader";
import AddTransaction from "./AddTransaction";
const TransactionTable = () => {
  const { isLoading, transactions, balance } = useTrans();

  if (isLoading) return <Loader />;
  return (
    <div className="overflow-x-auto h-screen">
      <h1 className="text-3xl absolute top-0 m-2">
        Total Balance :{" "}
        <span className="font-bold text-secondary ">{balance} $</span>{" "}
      </h1>
      <div className="collapse mt-20 w-[20rem] sm:w-[40rem]">
        <input type="checkbox" />
        <div className="collapse-title text-xs text-primary sm:text-sm btn btn-md">
          Add new Transaction
        </div>
        <div className="collapse-content">
          <AddTransaction />
        </div>
      </div>
      {transactions.length > 0 ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-sm text-primary">Title</th>
              <th className="text-sm text-primary"> Amount</th>
              <th className="text-sm text-primary">Description</th>
              <th className="text-sm text-primary">Date</th>
              <th className="text-sm text-primary">Category</th>
              <th className="text-sm text-primary">type</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <th>{transaction.title}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold"></div>
                        <div className="text-sm opacity-50">
                          {transaction.amount}$
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {transaction.descriptions}
                    <br />

                    <span className="badge badge-ghost badge-sm text-accent">
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <th>
                    <button
                      className={`btn btn-xs ${
                        transaction.transactionType === "debit"
                          ? "btn-error text-red"
                          : "btn-info"
                      }`}
                    >
                      {transaction.transactionType}
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="text-3xl mt-20">No Transaction Found...</h1>
      )}
    </div>
  );
};

export default TransactionTable;
