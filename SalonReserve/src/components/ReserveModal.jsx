import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

export const ReserveModal = () => {
  // modalの開閉状態を表す、trueなら開いている、falseなら閉じている
  const [open, setOpen] = useState(false);

  // openをtrueにしてmodalを開く
  const handleOpen = () => setOpen(true);
  // openをfalseにしてmodalを閉じる
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* onClickでこのボタンを押したときhandleOpenを呼び出しmodalを開くよう設定 */}
      <button onClick={handleOpen}>Open Modal</button>
      <Modal
        // modalの開閉をopenで制御
        open={open}
        // modal外をクリックしたりEscを押したときにhandleCloseが呼び出される
        onClose={handleClose}
        // 以下二行はアクセシビリティ対応
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* 以下がmodalの内容 */}
          <h2 id="modal-title">予約確定画面</h2>
          <p id="modal-description">Modal Content</p>
          <button onClick={handleClose}>Close</button>
        </Box>
      </Modal>
    </div>
  );
};
