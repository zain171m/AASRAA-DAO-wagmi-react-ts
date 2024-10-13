import abi from "./abi/abi.json";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

const Create = () => {
  const { writeContractAsync } = useWriteContract();

  return (
    <div className="mx-auto max-w-7xl p-5">
      <div className="py-3 flex flex-col gap-2">
        <h1 className="text-2xl text-white">Create new campaign</h1>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formObj = new FormData(e.currentTarget);
          console.log(formObj.get("name")?.toString());
          console.log(formObj.get("title")?.toString());
          console.log(formObj.get("description")?.toString());
          console.log(
            new Date(formObj.get("deadline")?.toString() ?? "0").getTime()
          );
          console.log(parseEther(formObj.get("target")?.toString() ?? "0"));
          console.log(formObj.get("image")?.toString());
          await writeContractAsync({
            abi,
            address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
            functionName: "requestCampaign",
            args: [
              formObj.get("name")?.toString(),
              formObj.get("title")?.toString(),
              formObj.get("description")?.toString(),
              new Date(formObj.get("deadline")?.toString() ?? "0").getTime(),
              parseEther(formObj.get("target")?.toString() ?? "0"),
              formObj.get("image")?.toString(),
            ],
          });
        }}
        //  form.name, //owner name
        // form.title, // title
        // form.description, // description
        // new Date(form.deadline).getTime(), // deadline,
        // form.target,
        // form.image,
        className="text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-5">
          {/* <Input
            label={"Name"}
            register={register}
            errors={errors}
            name="name"
            validation={{
              minLength: {
                value: 3,
                message: "Please enter at least 3 characters",
              },
            }}
          /> */}

          <div>
            <label className={`text-sm text-zinc-400`}>Name</label>
            <input
              id="name"
              name="name"
              className="bg-transparent p-2 text-white text-sm w-full outline-none border border-zinc-600 rounded-md"
              required
            />
          </div>
          {/* <Input
            label={"Title"}
            register={register}
            errors={errors}
            name="title"
            validation={{
              minLength: {
                value: 10,
                message: "Please enter at least 10 characters",
              },
            }}
          /> */}
          <div>
            <label className={`text-sm text-zinc-400`}>Title</label>
            <input
              id="title"
              name="title"
              className="bg-transparent p-2 text-sm w-full outline-none border border-zinc-600 rounded-md"
              required
            />
          </div>
        </div>
        {/* <Input
          textarea
          label={"Description"}
          register={register}
          errors={errors}
          name="description"
          validation={{
            minLength: {
              value: 20,
              message: "Please enter at least 20 characters",
            },
          }}
        /> */}
        <label className={`text-sm text-zinc-400`}>Description</label>
        <textarea
          id="description"
          name="description"
          className="bg-transparent p-5 text-sm w-full outline-none border border-zinc-600 h-40 rounded-md"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-5 pb-10">
          {/* <Input
            label={"Target"}
            type={"number"}
            step={"0.1"}
            min={0.1}
            register={register}
            errors={errors}
            name="target"
            validation={{}}
          /> */}
          <div>
            <label className={`text-sm text-zinc-400`}>Target</label>
            <input
              id="target"
              name="target"
              type="number"
              className="bg-transparent p-2 text-sm w-full outline-none border border-zinc-600 rounded-md"
              required
            />
          </div>
          {/* <Input
            label={"Deadline"}
            type={"date"}
            register={register}
            errors={errors}
            name="deadline"
            validation={{}}
          /> */}
          <div>
            <label className={`text-sm text-zinc-400`}>Deadline</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="bg-transparent text-white p-2 text-sm w-full outline-none border border-zinc-600 rounded-md"
              required
            />
          </div>
          {/* <Input
            label={"Image Link"}
            type={"url"}
            register={register}
            errors={errors}
            name="image"
            validation={{}}
          /> */}
          <div>
            <label className={`text-sm text-zinc-400`}>Image Link</label>
            <input
              id="image"
              name="image"
              type="url"
              className="bg-transparent p-2 text-sm w-full outline-none border border-zinc-600 rounded-md"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-zinc-800 font-bold text-base h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md"
        >
          Create Campaing
        </button>
      </form>
    </div>
  );
};

export default Create;

{
  /* <label className={`text-sm text-gray-text`}>Name</label>

<input
  id="name"
  className="bg-transparent p-2 text-sm w-full outline-none border border-gray-border rounded-md"
  required
/> */
}
