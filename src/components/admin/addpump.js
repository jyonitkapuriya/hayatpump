"use client"
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button, Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { addPums, deletePump, getPums, updatePump, uploadPumpImage } from '@/firebase/config';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Typography } from "@material-tailwind/react";
const TABLE_HEAD = ["Image", "Name", "Action"];
import 'react-toastify/dist/ReactToastify.css';

const AddPump = () => {
    const ref = useRef();
    const [image, setImage] = useState(null);
    const [pumpData, setPumpData] = useState({ name: "" });
    const [allPumps, setAllPumps] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    console.log("pumpData", pumpData, allPumps)
    useEffect(() => {
        getDoc()
    }, [loading])

    const getDoc = async () => {
        const res = await getPums()
        setAllPumps(res)
    }

    const imageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = async () => {
        setLoading(true)
        if (!image || pumpData.name === "") {
            toast.error("Please fill details")
            setLoading(false)
            return;
        }
        if (isEdit) {
            const res = await uploadPumpImage(image);
            const updateData = await updatePump(pumpData.id, { ...pumpData, imageUrl: image?.url ? image?.url : res })
            setLoading(false)
            setImage(null)
            setPumpData({ name: "" })
        } else {
            const res = await uploadPumpImage(image);
            const addData = await addPums(pumpData.name, res)
            setLoading(false)
            setImage(null)
            setPumpData({ name: "" })
        }
    };

    return (
        <div className="col-span-full p-8">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Pump image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {!image ? (
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={imageChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                ) : (
                    <Image src={image?.url ? image?.url : URL.createObjectURL(image)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                )}
                {image && <Button className="w-full aboslute ml-auto md:w-fit mt-5 h-12" color="gray" size="md" onClick={() => setImage(null)}>
                    Delate selected image
                </Button>}
            </div>
            <Input
                color="gray"
                size="lg"
                variant="static"
                label="Pump Name"
                name="first-name"
                placeholder="eg. Lucas"
                containerProps={{
                    className: "!min-w-full mb-3 md:mb-0 mt-10",
                }}
                value={pumpData.name}
                onChange={(e) => setPumpData({ ...pumpData, name: e.target.value })}
            />
            <Button className="w-full md:w-fit mt-5" color="gray" size="md" onClick={handleUpload}>
                Submit
            </Button>

            <div className='mt-5'>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allPumps.map(({ name, imageUrl, id }, index) => {
                            const isLast = index === allPumps.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <Image
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={imageUrl}
                                            alt='image'
                                            width={40}
                                            height={40}
                                        />
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {name}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <div className='flex gap-4'>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer"
                                                onClick={() => {
                                                    setIsEdit(true)
                                                    setImage({ url: imageUrl })
                                                    setPumpData({ name: name, id: id })
                                                }}
                                            >
                                                Edit
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer"
                                                onClick={async () => {
                                                    setLoading(true)
                                                    await deletePump(id)
                                                    setLoading(false)
                                                }}
                                            >
                                                Delate
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddPump;
