import { useStudentStore } from "@/store/studentStore";
import Image from "next/image";
import React from "react";

export default function ResultsModal({ isOpen, onClose, student }) {

  const { results, resultsError, loadingResult } = useStudentStore();

  if (!isOpen || !student) return null;


  if (resultsError) return <div className="w-[90%] max-w-2xl h-[360px] max-h-[400px]   flex items-center justify-center ">{resultsError}</div>

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-y-scroll py-10 flex items-center justify-center bg-black/50 z-20">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className=" absolute w-full h-full cursor-pointer" onClick={onClose} />
        <div className="bg-white p-4 shadow-lg w-[90%] max-w-2xl mt-20 relative z-30">

          {loadingResult ? <div className="w-[90%] max-w-2xl h-[360px] max-h-[400px]   flex items-center justify-center ">
            <div style={{ backgroundImage: "url('/assets/logo.png')", }} className="animate-pulse bg-cover bg-center w-[100px] h-[100px]" />
          </div> :
            <>
              {/* header section */}
              <div className="grid grid-cols-5 gap-5 items-center">

                <Image
                  src="/assets/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="col-span-1 "
                />

                <div className="col-span-3 text-center lg:space-y-2">
                  <h4 className="text-[10px] lg:text-base font-semibold">FREMONT COLLEGE OF EDUCATION</h4>
                  <p className="text-[8px] lg:text-sm font-light">No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.</p>
                  <p className="text-[10px] lg:text-base font-semibold">Post Graduate Diploma in Education</p>
                  <h4 className="text-[8px] lg:text-xs font-semibold">Student First Semester Statement Of Result</h4>
                </div>
                <Image
                  src="/assets/avatar.png"
                  alt="name"
                  width={100}
                  height={100}
                  className="col-span-1"
                />

              </div>


              {/* bio data section */}
              <div className="mt-5 lg:mt-10 grid grid-cols-2 gap-2 justify-between lg:gap-4">
                <div className="flex items-center gap-3 text-[10px] lg:text-sm">
                  <p className="font-semibold">Name:</p>
                  <p>{results?.firstname} {results?.surname}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] lg:text-sm">
                  <p className="font-semibold">Level:</p>
                  <p>{results?.level}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] lg:text-sm">
                  <p className="font-semibold">Reg. No.:</p>
                  <p>{results?.reg_no}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] lg:text-sm">
                  <p className="font-semibold">Session:</p>
                  <p>{results?.session}</p>
                </div>
              </div>

              {/* results section */}
              <table className="w-full mt-8 text-[10px] border-collapse border-0">
                <thead className="bg-[#0D7590] text-white">
                  <tr className=" border-0">
                    <th className="border-0 p-2">SN</th>
                    <th className="border-0 p-2">Course Code</th>
                    <th className="border-0 p-2">Course Title</th>
                    <th className="border-0 p-2 text-center">Unit</th>
                    <th className="border-0 p-2 text-center">Grade</th>
                    <th className="border-0 p-2 text-center">Total Point</th>
                  </tr>
                </thead>
                <tbody>
                  {/* className={index % 2 === 1 ? "bg-gray-100" : ""} */}
                  {results?.result?.map((result, index) => {
                    return <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border-0 p-2">{index + 1}</td>
                      <td className="border-0 p-2">{result?.coursecode}</td>
                      <td className="border-0 p-2">{result?.title}</td>
                      <td className="border-0 text-center p-2">{result?.credit_unit}</td>
                      <td className="border-0 text-center p-2">{result?.grade}</td>
                      <td className="border-0 text-center p-2">{result?.total_point}</td>
                    </tr>
                  })}
                </tbody>
              </table>


              <table className="w-2/3 text-center mt-8 text-[10px] border-collapse border-0">
                <thead className="bg-[#0D7590] text-white">
                  <tr className=" border-0">
                    <th className="border-0 p-2">UNTS</th>
                    <th className="border-0 p-2">GPTS</th>
                    <th className="border-0 p-2">GPATS</th>
                    <th className="border-0 p-2">UNTD</th>
                    <th className="border-0 p-2">GPTD</th>
                    <th className="border-0 p-2">GPATD</th>
                  </tr>
                </thead>

                <tbody>
                  {results?.cummulative && <tr className="bg-[#F2F2F2]">
                    <td className="border-0 p-2">{results?.cummulative?.unts}</td>
                    <td className="border-0 p-2">{results?.cummulative?.gpts}</td>
                    <td className="border-0 p-2">{results?.cummulative?.gpats}</td>
                    <td className="border-0 p-2">{results?.cummulative?.untd}</td>
                    <td className="border-0 p-2">{results?.cummulative?.gptd}</td>
                    <td className="border-0 p-2">{results?.cummulative?.gpatd}</td>
                  </tr>}
                </tbody>
              </table>


              <div className="mt-4 gap-3 flex items-center text-xs lg:text-sm">
                <h4 className="font-semibold">Remark:</h4>
                <p className="text-[#0D7590]">{results?.cummulative?.remarks}</p>
              </div>

              <div className="mt-16">

                <div className="w-1/5 border-b " />
                <p className="text-[10px]">Registrar</p>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};
// 
// FCE
// 
// 
// 

{/* <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div> */}