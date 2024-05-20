import { useTrans } from "../contexts/TransactionsContext";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import AddTransaction from "./AddTransaction";
import { ImCross } from "react-icons/im";
import { LiaUserEditSolid } from "react-icons/lia";
import React, { useState } from "react";
import { useAuth } from "../contexts/UsersContext";

const initialState = {
  title: "",
  descriptions: "",
  amount: 0,
  categories: { connect: [{ id: 0 }] },
  transactionType: "credit",
};

const TransactionTable = () => {
  const {
    isLoading,
    transactions,
    balance,
    deleteExpense,
    addExpense,
    editExpense,
  } = useTrans();
  const router = useRouter();
  const [expense, setExpense] = useState(initialState);

  const { category } = useAuth();

  async function handleDelete(id) {
    await deleteExpense(id);
    router.push("/dashboard");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  }

  async function handleEditSubmit(e, transactionId) {
    e.preventDefault();
    await editExpense(transactionId,expense);
    setExpense(initialState);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    await addExpense(expense);

    setExpense(initialState);
    router.push("/dashboard");
  }
  if (isLoading) {
    return <Loader />;
  }

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
          <AddTransaction
            handleChange={handleChange}
            handleFormSubmit={handleFormSubmit}
            expense={expense}
          />
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
                      className={`badge gap-2  ${
                        transaction.transactionType === "debit"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {transaction.transactionType}
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-sm text-red-400 bg-transparent"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <span>
                        <ImCross />
                      </span>
                    </button>
                  </th>
                  <th>
                    <label htmlFor="my_modal_6" className="btn">
                      <span className="text-xl text-info">
                        <LiaUserEditSolid />
                      </span>
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_6"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <form
                          className="card-body"
                          onSubmit={(e) => handleEditSubmit(e, transaction.id)}
                        >
                          <div className="form-control">
                            <input
                              type="text"
                              name="title"
                              placeholder="title"
                              value={expense.title}
                              className="input input-sm input-bordered"
                              required
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-control">
                            <textarea
                              className="textarea textarea-info"
                              placeholder="Descriptions"
                              name="descriptions"
                              value={expense.descriptions}
                              onChange={handleChange}
                            ></textarea>
                            <div className="form-control my-2">
                              <div className="form-control">
                                <input
                                  type="number"
                                  name="amount"
                                  onChange={handleChange}
                                  placeholder="Amount"
                                  value={expense.amount}
                                  className="input input-sm input-bordered"
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-control flex flex-row ">
                              <select
                                className="select mx-1 select-primary w-1/2 max-w-xs"
                                value={
                                  expense.categories?.connect?.[0]?.id ||
                                  "other"
                                }
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "categories",
                                      value: {
                                        connect: [
                                          { id: parseInt(e.target.value) },
                                        ],
                                      },
                                    },
                                  })
                                }
                              >
                                {category.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.categories}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="select select-primary w-1/2 max-w-xs"
                                value={expense.transactionType}
                                onChange={handleChange}
                                name="transactionType"
                              >
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                              </select>
                            </div>
                            <div className="form-control my-2"></div>
                          </div>
                          <div className="form-control mt-6">
                            <button
                              type="submit"
                              className="btn btn-md btn-primary"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                        <div className="modal-action">
                          <label htmlFor="my_modal_6" className="btn">
                            X
                          </label>
                        </div>
                      </div>
                    </div>
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
