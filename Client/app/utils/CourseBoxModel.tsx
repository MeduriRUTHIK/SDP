import Image from 'next/image';
import React, { FC } from 'react';


type Props = {
    course: any;
    open: boolean;
    setOpen: (open: boolean) => void;
    cardData:any;
    setCardData:any;
};

const CourseBoxModel: FC<Props> = ({ course, cardData,open, setOpen,setCardData }) => {
    const { title, price, ratings, name, tags, estimatedPrice, thumbnail } = course;
    const courseTags = tags.split(",");
    const handleClick = () => {
        setOpen(true);
        setCardData(course)
    };

    return (
        <div className="w-full dark:bg-slate-800 bg-slate-300 z-10 rounded-xl shadow-xl pb-6 text-black dark:text-white hover:shadow-2xl">
            <div className="inline-block m-4 relative cursor-pointer">
                <Image
                    src={thumbnail.url}
                    alt=""
                    width={500}
                    height={600}
                    layout="responsive"
                    className="rounded-xl"
                />
            </div>
            <div className="px-4 py-2">
                <h1 className="text-xl font-semibold">{name}</h1>
            </div>
            <div className="px-4">
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="text-2xl font-semibold">${price}</h1>
                    <div className="flex justify-end gap-2">
                        <h1 className="text-2xl font-normal line-through">
                            ${estimatedPrice}
                        </h1>
                        <h1 className="text-2xl font-normal">{ratings}%<sub>off</sub></h1>
                    </div>
                </div>
                <div className="flex gap-2 py-2">
                    {
                        courseTags && courseTags.map((tag: any, index: number) => (
                            <h2 key={index}>{tag}</h2>
                        ))
                    }
                </div>
                <div className="">
                    <h1 className="text-3xl my-2 font-semibold">{title}</h1>
                    <h1 className="text-base pb-4">Rating: {ratings}</h1>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 px-2 py-4 rounded-full font-Poppins font-[500]"
                    onClick={handleClick}
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default CourseBoxModel;
