function Spinner(props: { height: string; width: string; color: string }) {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div
                className={`z-[1000] ${props.height} ${props.width} animate-spin rounded-full border-4 ${props.color} border-t-transparent`}
            ></div>
        </div>
    );
}

export default Spinner;
