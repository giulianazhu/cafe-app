export default function ModalWindow({ children }) {
  return (
    <Page>
      <Wrapper>{children}</Wrapper>
    </Page>
  );
}

// function Page({ children }) {
//   return (
//     <div className="fixed z-50 flex h-[100vh] w-full items-center justify-center bg-stone-900 opacity-[0.97]">
//       {children}
//     </div>
//   );
// }
function Page({ children }) {
  return (
    <div className="fixed inset-0 z-10 flex h-[100vh] w-full items-center justify-center bg-stone-900 opacity-[0.97]">
      {children}
    </div>
  );
}

function Wrapper({ children }) {
  return <div className="mb-12 w-11/12 max-w-96"> {children} </div>;
}
