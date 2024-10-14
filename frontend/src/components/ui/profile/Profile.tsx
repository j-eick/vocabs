type ProfileProps = {
    className: string;
};

export default function Profile({ className }: ProfileProps) {
    return (
        <div className={`w-max h-full p-3 border-2 border-dashed ${className}`}>
            <div
                className={`h-1/2 w-20 px-2 grid place-items-center
                                    border-2 rounded-2xl`}
            >
                Profile-Pic
            </div>
            <span>Name</span>
        </div>
    );
}
