import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidbyUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidbyUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function hundleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidbyUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidbyUser);
  }

  return (
    <form className="form-split-bill" onSubmit={hundleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👦🏻Your expense</label>
      <input
        type="text"
        value={paidbyUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidbyUser : Number(e.target.value)
          )
        }
      />

      <label>🧑🏻‍🦰{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💳Who's paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>💸 Split Bill</Button>
    </form>
  );
}
