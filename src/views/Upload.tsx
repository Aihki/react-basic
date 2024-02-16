import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
//import {useBook, useFile} from '../hooks/apiHooks';
import {useBook, useFile} from '../hooks/graphQLHooks';
import {useNavigate} from 'react-router-dom';

// Upload.tsx
const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postBook} = useBook();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      const bookResult = await postBook(fileResult, inputs, token);
      console.log(bookResult.message);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  // Upload.tsx
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h3 className="text-3xl">Upload</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="title">
            Title
          </label>
          <input  className="m-3 w-2/3 rounded-md border-slate-500 p3 text-slate-950"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="description">
            Description
          </label>
          <textarea className="m-3 w-2/3 rounded-md border-slate-500 p3 text-slate-950"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="file">
            File
          </label>
          <input className="m-3 w-2/3 rounded-md border-slate-500 p3 text-slate-950"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          className=" w-48 h-48 object-cover rounded-md m-4"
        />
        <div  className="flex w-4/5 justify-end">
        <button className="m-3 w-1/3 rounded-md bg-slate-750 p3"
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
        </div>
      </form>
    </>
  );
};
export default Upload;
