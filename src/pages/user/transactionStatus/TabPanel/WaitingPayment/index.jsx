import React from "react";

function TabWaitingPayment() {
  return (
    <div>hello</div>
    // <div className="transaction-item">
    //   <div className="transaction-item-info1">
    //     <strong>Belanja</strong>
    //     <span className="mx-2">
    //       {`${trx.transactionDate.date} ${trx.transactionDate.monthWord} ${trx.transactionDate.year}`}{" "}
    //     </span>
    //     <span className="transaction-status">Selesai</span>
    //     {trx.invoiceNumber}
    //   </div>
    //   {/* merah - end */}
    //   <div className="d-flex justify-content-between">
    //     {/* kuning - start */}
    //     <div>
    //       {trx.transactionItems.map((item) => {
    //         // ungu - start
    //         return (
    //           <div>
    //             <p>Emmerce</p>

    //             <div className="d-flex">
    //               <img className="transaction-img" src={item.productImage} />
    //               <div className="ms-3 transaction-info2">
    //                 <p>
    //                   <strong>{item.productName}</strong>
    //                 </p>
    //                 <p className="support">
    //                   {item.quantity} barang x Rp. {item.price}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //         // ungu - start
    //       })}
    //     </div>
    //     {/* kuning - end */}

    //     {/* hijau - start */}
    //     <div className="transaction-total-price d-flex flex-column justify-content-center ">
    //       <p>Total belanja</p>
    //       <p>
    //         <strong> Rp. {trx.totalPayment} </strong>
    //       </p>
    //     </div>
    //     {/* hijau - end */}
    //   </div>

    //   {/* hitam - start */}
    //   <div className="transaction-detail-link">
    //     <span
    //       onClick={() => {
    //         setIsModalShow(!isModalShow);
    //       }}
    //     >
    //       Lihat detail transaksi
    //     </span>
    //   </div>
    //   {/* hitam - end */}
    // </div>
  );
}

export default TabWaitingPayment;
