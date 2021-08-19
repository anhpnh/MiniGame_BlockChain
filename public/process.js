$(document).ready(function () {
  let abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_vi",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_id",
          type: "string",
        },
      ],
      name: "SM_ban_data",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_id",
          type: "string",
        },
      ],
      name: "DangKy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "arrHocVien",
      outputs: [
        {
          internalType: "string",
          name: "_ID",
          type: "string",
        },
        {
          internalType: "address",
          name: "_VI",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  let addressSM = "0xF44F0CFFf08344a2a753603DfC01c21e11320308";

  let web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  let contract_MM = new web3.eth.Contract(abi, addressSM);
  console.log(contract_MM);

  let currentAccount = "";
  checkMM();

  $("#connectMM").click(function () {
    connectMM()
      .then((data) => {
        currentAccount = data[0];
        console.log(currentAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $("#btnDangKy").click(function () {
    $.post(
      "./dangky",
      {
        Email: $("#txtEmail").val(),
        HoTen: $("#txtHoTen").val(),
        SoDT: $("#txtSoDT").val(),
      },
      function (data) {
        if (currentAccount.length == 0) {
          alert("Vui long dang nhap MM!");
        } else {
          if (data.ketqua == 1) {
            contract_MM.methods.DangKy(data.maloi._id).send({
              from: currentAccount,
            });
          }
        }
      }
    );
  });
});

async function connectMM() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  return accounts;
}

function checkMM() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    console.log("Ban chua cai MetaMask kia!!!");
  }
}
