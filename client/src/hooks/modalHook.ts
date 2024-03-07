import {useState, useEffect, useRef} from "react";

const useFilterModal = () => {

    const myRef = useRef<HTMLButtonElement>(null)
    const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false)

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
            if (myRef.current && !myRef.current.contains(e.target)) {
              setDropdownDisplay(false) 
            }
          }
          document.addEventListener("click", checkIfClickedOutside)
          return () => {
            document.removeEventListener("click", checkIfClickedOutside)
          }
    }, []);

}



export {useFilterModal}