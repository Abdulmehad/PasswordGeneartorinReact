import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const[character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');
    //useRef hook
  const passwordRef = useRef(null)//useRef hook will create a reference to the input element


  const copyPasswordToClipboard = useCallback(() => { //useCallback will prevent the copyPasswordToClipboard function from being re-created on every render
    passwordRef.current?.select(); //.? is optional chaining operator, it will check if the passwordRef.current is not null or undefined
  // passwordRef.current?.setSelectionRange(0, 999) ;//This will select the text in the input element from 0-999 chracters
    window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator= useCallback(() => { //useCallback will prevent the passwordGenerator function from being re-created on every render

    let pass = '';
    let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCase = 'abcdefghijklmnopqrstuvwxyz';

    let numbers = '0123456789';
    let specialCharacters = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let str = lowerCase + upperCase;
    if (number) str += numbers;
    if (character) str += specialCharacters;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      //This will generate random number between 1 to str.length and store it in char 
      pass += str.charAt(char)
      //This will take a random character from str that is loacated at str[char] and add it to pass 
    }

    setPassword(pass);

  }, [length, number, character,setPassword]);//array has dependecies that will trigger the useCallback hook


                     //useeffect hook runs when the page is reloaded
  useEffect(() => {  //Use effect hook will run the passwordGenerator function whenever the length, numberAllowed, charAllowed changes
    passwordGenerator()
  }, [length, number, character, passwordGenerator])//array has the dependecies that will trigger the useEffect hook




  return (
     <div class="relative h-screen">
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 p-8">

  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500 ">
        <h1 className='font-bold font-serif text-center text-4xl mb-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type='text'
            value={password}
            className='w-full px-4 py-2 text-gray-700 text-center'
           // placeholder='Password'
            readOnly
            ref={passwordRef}//ref hook will be used to reference the input element
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition-transform transform hover:scale-105 hover:font-bol'>
            Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev )
                }}
              />
              <label htmlFor="characterInput">Characters</label>
              </div>
            </div>
            </div>
          <footer className='text-center text-black text-sm mt-4'>This is Created by Abdul Mehad with React</footer>
        </div>
        </div>
  ); // Add closing parenthesis here

}

export default App;
