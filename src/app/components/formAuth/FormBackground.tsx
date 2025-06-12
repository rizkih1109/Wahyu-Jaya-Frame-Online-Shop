import SecFooter from "../SecFooter";

export default function FormBackground({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col justify-center items-center basis-3/5">
        <div className="flex flex-col justify-center grow">
            {children}
        </div>
        <SecFooter />
      </div>
      <div className="basis-2/5 bg-inputBg"></div>
    </div>
  );
}
