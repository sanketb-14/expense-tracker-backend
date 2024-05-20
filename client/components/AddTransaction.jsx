"use client";

import { useAuth } from "../contexts/UsersContext";
import { useTrans } from "../contexts/TransactionsContext";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const AddTransaction = ({ handleChange, handleFormSubmit, expense }) => {
  const { category } = useAuth();

  

  return (
    <div className="card mt-2 shrink-0 w-full shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleFormSubmit}>
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
              value={expense.categories.connect[0].id}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "categories",
                    value: { connect: [{ id: parseInt(e.target.value) }] },
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
          <button type="submit" className="btn btn-md btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
