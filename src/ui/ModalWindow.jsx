import { createPortal } from 'react-dom';

// function ModalWindow({ children }) {
//   return createPortal(
//     <div className="relative left-1/2 top-1/2 flex h-max w-[75vw] max-w-[27rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md border-2 border-pink-100 bg-gray-100 p-3 text-black">
//       {children}
//     </div>,
//     <div className=""></div>,
//     document.body,
//   );
// }

const positionRef = document.getElementById('menupage');

// function ModalWindow({ children }){
//   return createPortal(
//     <div className=''> { children } </div>, document.body
//   )
// }

// function ModalWindow({ children }) {
//   return createPortal(<div className=""> {children} </div>, document.body);
// }

function ModalWindow({ children }) {
  return (
    <div className="absolute flex h-full w-full items-start justify-center bg-stone-900 opacity-[0.97] ">
      {children}
    </div>
  );
}

export default ModalWindow;
