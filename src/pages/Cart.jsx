import React from "react";

function Cart({
  cart,
  removeFromCart,
  updateCartItemQuantity,
  cartTotals,
  formatMoney,
}) {
  if (!cart.length) {
    return (
      <div className="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row row__column">
              <h2 className="cart__title">Your cart is empty</h2>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
   <div className="books__body">
    <main id="books__main">
      <div className="books__container">
        <div className="row">
          <div className="books__selected--top">
            <h2 className="cart__title">Your Cart</h2>
            <div className="cart">
              <div className="cart__header">
                <div className="cart__book">Item</div>
                <div className="cart__quantity">Quantity</div>
                <div className="cart__total">Total</div>
              </div>
              <div className="cart__body">
                {cart.map((book) => {
                  const unitPrice = book.salePrice || book.originalPrice;
                  return (
                    <div className="cart__item" key={book.id}>
                      <div className="cart__book">
                        <img src={book.url} alt={`${book.title} cover`} className="cart__book--img" />
                        <div className="cart__book--info">
                          <span className="cart__book--title">{book.title}</span>
                          <span className="cart__book--price">{formatMoney(unitPrice)}</span>
                          <button className="cart__book--remove" onClick={() => removeFromCart(book.id)}>Remove</button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          min="1"
                          value={book.quantity}
                          className="cart__quantity--input"
                          onChange={(event) =>
                            updateCartItemQuantity(book.id, Number(event.target.value))
                          }
                        />
                      </div>
                      <div className="cart__total">
                        {formatMoney(unitPrice * book.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart__summary">
              <div className="cart__summary--item cart__summary--sub-total">
                <span>Subtotal</span>
                <span>{formatMoney(cartTotals.subTotal)}</span>
              </div>
              <div className="cart__summary--item">
                <span>Tax</span>
                <span>{formatMoney(cartTotals.tax)}</span>
              </div>
              <div className="cart__summary--item cart__summary--total">
                <span>Total</span>
                <span>{formatMoney(cartTotals.total)}</span>
              </div>
              <button className="btn btn__checkout no-cursor" onClick={() => alert("this button has no functionality yet")}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </main>
   </div>
  );
}

export default Cart;