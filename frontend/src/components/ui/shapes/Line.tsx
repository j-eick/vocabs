type LineProps = {
    lineStyle: string;
    lineBox: string;
};

export default function Line({ lineBox, lineStyle }: LineProps) {
    return (
        <div className={` ${lineBox}`}>
            <div className={`${lineStyle}`} />
        </div>
    );
}
