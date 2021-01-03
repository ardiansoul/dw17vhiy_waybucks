import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { baseUrl } from "../Utils/API";

function AddTopingPage() {
  const [localState, setLocalState] = useState({
    form: {
      name: "",
      price: 0,
    },
    preview: null,
  });

  const [photo, setPhoto] = useState(null);
  // const [alert, setAlert] = useState({
  //   status: "",
  //   message: "",
  // });

  const history = useHistory();
  const [mutate] = useMutation((form) => {
    return Axios({
      method: "post",
      url: `${baseUrl}api/v1/topings`,
      data: form,
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      form: { ...localState.form, [e.target.name]: e.target.value },
    });
  };

  const handleImage = (e) => {
    let imageReader = new FileReader();
    if (e.target.files[0]) {
      // setLocalState({
      //   ...localState,
      //   form: { ...localState.form, photo: e.target.files[0] },
      // });
      setPhoto(e.target.files[0]);
    }
    imageReader.onloadend = (e) => {
      setLocalState({ ...localState, preview: [imageReader.result] });
    };
    imageReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // Object.entries(localState.form).map((value) =>
      //   data.append(value[0], value[1])
      // );
      data.append("name", localState.form.name);
      data.append("price", localState.form.price);
      data.append("photo", photo);

      await mutate(data, {
        onSuccess: (data) => {
          setLocalState({
            form: {
              name: "",
              price: "",
              photo: {},
            },
            preview: null,
          });
          // setAlert({ status: data.status, message: data.data.message });
          // setTimeout(() => {
          //   setAlert("");
          // }, 3000);
          history.push("/");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full relative">
      <Header />
      {/* {alert && <Alert message={alert.message} status={alert.status} />} */}
      <div className="w-10/12 flex pb-10 m-auto justify-between">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold fontFamily-freight text-base">
            Toping
          </h1>
          <form
            className="flex flex-col mt-10"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              name="name"
              value={localState.form.name}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Toping Name"
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) => {
                handleChange(e);
              }}
              name="price"
              value={localState.form.price}
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6"
            />
            <label className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6 flex justify-between">
              <h3 className="text-gray-600">Toping Photo</h3>
              <input
                placeholder="Product Photo"
                className="hidden"
                type="file"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
              <FontAwesomeIcon icon={faPaperclip} className="text-base" />
            </label>
            <button
              className="w-10/12 h-10 bg-base text-white mt-6 rounded-md self-center"
              type="submit"
            >
              Add Toping
            </button>
          </form>
        </div>
        <div
          className="w-5/12 border-2 border-base rounded-md"
          style={{
            height: "500px",
          }}
        >
          {localState.preview ? (
            <img
              src={localState.preview}
              alt={"input"}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <h3>Preview Image in Here</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTopingPage;
