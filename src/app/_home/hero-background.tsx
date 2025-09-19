const commonClass = "bg-gradient-to-r from-blue-400 to-blue-100 absolute -z-10 rounded-4xl"
const mobileClass = "h-[500px] w-[400px]  top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl"
const desktopClass = "lg:h-[1000px] lg:w-[1000px]  lg:top-[400px] lg:-right-[300px] lg:rotate-[-150deg]"


export const HeroBackground = ({className}: {className?: string}) => {
    return (
        <>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F9FAFB' strokeWidth='0.4'%3E%3Cpath d='M0 0h12v12H0z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            <div className={`${commonClass} ${mobileClass} ${desktopClass} ${className}`}></div>
        </>
    );
};