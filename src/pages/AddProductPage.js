import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { baseUrl } from "../Utils/API";

function AddProductPage() {
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
      url: `${baseUrl}api/v1/products`,
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
      <div className="w-10/12 pb-10 flex m-auto justify-between">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold fontFamily-freight text-base">
            Product
          </h1>
          <form
            className="flex flex-col mt-10"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Product Name"
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md"
              name="name"
              onChange={(e) => handleChange(e)}
              value={localState.form.name}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6"
              name="price"
              onChange={(e) => handleChange(e)}
              value={localState.form.price}
            />
            <label className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6 flex justify-between">
              <h3 className="text-gray-600">Product Photo</h3>
              <input
                placeholder="Product Photo"
                className="hidden"
                name="photo"
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
              Add Product
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
            <div className="h-full flex justify-center items-center">
              <h3>Preview Image in Here</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
