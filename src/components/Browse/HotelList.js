import React, { useState } from "react";
import { A } from "hookrouter";
import { DEFAULT_IMAGE } from "../../Common/constants";
import Star from "../common/Star";

const HotelList = ({ hotels, search, input }) => {
    const maxLimit = 12;
    const [offset, setOffset] = useState(0);
    let result = [];
    let i = 0;
    let j = 0;
    let space = true;
    for (i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
            space = false;
            break;
        }
    }
    if (input.length === 0 || space === true) {
        result = hotels;
    } else if (search.length !== undefined && search.length !== 0) {
        result = [];
        for (i = 0; i < search.length; i++) {
            for (j = 0; j < hotels.length; j++) {
                if (search[i].id === hotels[j].id) {
                    result = result.concat(search[i]);
                }
            }
        }
    }
    const totalPage = Math.ceil(result.length / maxLimit);
    const getPageNumbers = (current) => {
        let n = 3;
        let m = current - 2;
        const pageNumbers = [];
        if (current === 1) {
            if (totalPage === 0) {
                return [1];
            }
            if (totalPage < 3) {
                n = totalPage;
            }
            for (i = 1; i <= n; i++) {
                pageNumbers.push(i);
            }
        }
        else if (current < totalPage) {
            for (i = current - 1; i <= current + 1; i++) {
                pageNumbers.push(i);
            }
        }
        else {
            if (current - 2 < 1) {
                m = 1;
            }
            for (i = m; i <= current; i++) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };
    const handlePage = (pageNo) => {
        console.log(pageNo);
        if (pageNo === 1) {
            setPagenumbers(getPageNumbers(1));
        }
        else {
            setPagenumbers(getPageNumbers(pageNo));
        }
        setOffset((pageNo - 1) * maxLimit)
    };
    const [pageNumbers, setPagenumbers] = useState(getPageNumbers(1));
    if (result.length === 0) {
        return (
            <div>
                <br />
                <br />
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                            Sorry :)
                        </h3>
                        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                            Unfortunately no hotels matched your search
                            parameters
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hotelslist-center max-w-6xl mx-auto">
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 md:grid-cols-3 md:max-w-none sm:mx-8">
                {result.slice(offset, offset + maxLimit).map((item) => {
                    return (
                        <div key={item.id}>
                            <A
                                className="flex flex-col rounded-lg shadow-sm border overflow-hidden max-w-xs mx-auto hover:shadow-xl"
                                href={`/roomlist/${item.id}`}>
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover"
                                        src={
                                            (item.photos && item.photos[0]) ||
                                            DEFAULT_IMAGE.HOTEL
                                        }
                                        alt={item.name}
                                    />
                                </div>
                                <div className="block">
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm leading-5 font-medium text-indigo-600 h-4">
                                                <span className="flex">
                                                    <Star
                                                        num={item.starCategory}
                                                        dim={4}
                                                    />
                                                </span>
                                            </p>
                                            <h3 className="mt-2 text-base truncate leading-7 font-semibold text-gray-900">
                                                {item.name}
                                            </h3>
                                            {/* <p className="mt-3 text-xl leading-6 text-gray-500">
                                            Rs. 18,000
                                       </p> */}
                                        </div>

                                        <div className="mt-6 flex items-center">
                                            <div className="ml-3">
                                                <p className="text-sm leading-5 font-medium text-gray-900">
                                                    {item.category}
                                                </p>
                                                <div className="flex text-sm leading-5 text-gray-500 h-24">
                                                    {/* <time dateTime="2020-03-16">
                                                Mar 16, 2020
                                            </time> */}
                                                    {item.district}
                                                    <br />
                                                    {item.address}
                                                    <span className="mx-1">
                                                        &middot;
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </A>
                        </div>
                    );
                })}
            </div>
            <div className={` ${totalPage === 1 ? "hidden" : "sm:flex-1 mt-2 text-center justify-between"}`}>
                <div>
                    <nav className="inline-flex shadow-sm">
                        <button
                            type="button"
                            key={`page_${1}`}
                            className={`-ml-px  "hover:text-gray-800" relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                            onClick={() => handlePage(1)}>
                            First
                        </button>
                        {
                            pageNumbers.map((pageNo) => (
                                <button
                                    type="button"
                                    key={`page_${pageNo}`}
                                    className={`-ml-px ${
                                        pageNo === offset / maxLimit + 1
                                            ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                                            : "hover:text-gray-800"
                                        } relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                                    onClick={() => handlePage(pageNo)}>
                                    {pageNo}
                                </button>
                            ))
                        }
                        <button
                            type="button"
                            key={`page_${totalPage}`}
                            className={`-ml-px  "hover:text-gray-800" relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                            onClick={() => handlePage(totalPage)}>
                            Last
                        </button>
                    </nav >
                </div >
            </div >
        </div >
    );
};

export default HotelList;
