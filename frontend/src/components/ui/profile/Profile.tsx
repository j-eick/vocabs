type ProfileProps = {
    image: string;
    name: string;
    className?: string;
};

export default function Profile({ image, name, className }: ProfileProps) {
    return (
        <div
            className={`h-28 w-28 flex flex-col items-center
                        ${className}`}
        >
            <div
                className={`h-2/3 w-4/6 overflow-hidden
                            border-2 rounded-full`}
            >
                <img
                    src={image}
                    alt="profile_foto"
                    className="h-full w-full object-cover"
                />
            </div>
            <span className="h-1/3 place-content-center">{name}</span>
        </div>
    );
}
