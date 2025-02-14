'use client'
import Image from "next/image";
import DropDownComp from "./Components/DropDownComp";
import { use, useEffect, useState } from "react";
import ResultsModal from "./Components/ResultsModal";
import { useStudentStore } from "@/store/studentStore";

export default function Home() {

  const { fetchData, students, loading, fetchResults, fetchstates, fetchLevels,
    fetchGender,
    fetchAge,
    states,
    age,
    gender,
    levels,
    fetchFilter
  } = useStudentStore();

  useEffect(() => {
    fetchData();
    fetchstates();
    fetchLevels();
    fetchGender();
    fetchAge();
  }, [fetchData, fetchResults, fetchstates, fetchLevels, fetchGender, fetchAge]);


  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal with selected student data
  const openModal = (student) => {
    setSelectedStudent(student?.id);
    fetchResults(student?.id);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const [selectedAge, setSelectedAge] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedGender, setSelectedGender] = useState("")

  const handleFilter = () => {
    const data = {
      age: selectedAge,
      state: selectedState,
      level: selectedLevel,
      gender: selectedGender
    }

    // console.log('data', data)
    fetchFilter(data)

  }

  const handleClearFilter = () => {
    setSelectedAge("")
    setSelectedLevel("")
    setSelectedState("")
    setSelectedGender("")
    fetchData();
  }

  console.log('students', students?.length)


  return (
    <div className=" min-h-screen  bg-zinc-100 ">

      <div className="bg-white/90 m-2 lg:m-5 px-4 lg:px-10 py-8 ">

        <h2 className="text-xl font-bold">
          Filter Student Table By:
        </h2>


        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <DropDownComp label="Age" options={age} placeholder={"select age"} onChange={(value) => setSelectedAge(value)} />
          <DropDownComp label="State" options={states} placeholder={"select state"} onChange={(value) => setSelectedState(value)} />
          <DropDownComp label="Level" options={levels} placeholder={"select level"} onChange={(value) => setSelectedLevel(value)} />
          <DropDownComp label="Gender" options={gender} placeholder={"select gender"} onChange={(value) => setSelectedGender(value)} />
          <button className={`bg-green-500 text-white rounded-md font-semibold ${!selectedAge && !selectedGender && !selectedLevel && !selectedState ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleFilter} disabled={!selectedAge && !selectedGender && !selectedLevel && !selectedState}>Search</button>
          <button className={`bg-red-500 text-white rounded-md font-semibold ${!selectedAge && !selectedGender && !selectedLevel && !selectedState ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleClearFilter} disabled={!selectedAge && !selectedGender && !selectedLevel && !selectedState}>Clear Filter</button>
        </div>
      </div>

      <div className="bg-white/90 m-2 lg:m-5  p2-4 lg:px-10 pb-8 relative h-[55vh] overflow-y-scroll scrollable-area">
        <div className="w-full sticky top-0 left-0 bg-white h-8  z-10 " />
        {loading ? <div className="h-full w-full flex items-center justify-center ">
          <div style={{ backgroundImage: "url('/assets/logo.png')", }} className="animate-pulse bg-cover bg-center w-[100px] h-[100px]" />
        </div> : <>
          <table className="w-full text-left overflow-y-hidden ">
            <thead className="bg-gray-50 sticky top-7 left-0">
              <tr className="font-semibold text-sm">
                <th className="py-3 px-4 hidden lg:table-cell">SN</th>
                <th className="px-4">Surname</th>
                <th className="px-4">First Name</th>
                <th className="px-4 hidden lg:table-cell">Age</th>
                <th className="px-4 hidden lg:table-cell">Gender</th>
                <th className="px-4 ">Level</th>
                <th className="px-4 hidden lg:table-cell">State</th>
                <th className="text-center w-fit">Action</th>
              </tr>
            </thead>
            <tbody>
              {!students?.length || students?.length === 0 ? <tr className="text-center"><td className="py-10" colSpan={8}>No Student data found..!</td></tr> :
                <>
                  {students?.map((student, i) => (
                    <tr key={student?.id} className="border-b text-xs">
                      <td className="py-3 px-4 hidden lg:table-cell">{i + 1}</td>
                      <td className="px-4">{student?.surname}</td>
                      <td className="px-4">{student?.firstname}</td>
                      <td className="px-4 hidden lg:table-cell">{student?.age}</td>
                      <td className="px-4 hidden lg:table-cell">{student?.gender}</td>
                      <td className="px-4">{student?.level}</td>
                      <td className="px-4 hidden lg:table-cell">{student?.state}</td>
                      <td className="text-center w-fit">
                        <button
                          onClick={() => openModal(student)}
                          className="bg-green-500 px-4 py-1 text-xs text-white font-thin rounded-none"
                        >
                          Download Result
                        </button>
                      </td>
                    </tr>
                  ))}
                </>}
            </tbody>
          </table></>}
      </div>
      <ResultsModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />
    </div>
  );
}
