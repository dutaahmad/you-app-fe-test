
const InterestFlexbox = ({isEditInterests, interests}: {isEditInterests: boolean, interests?: string[]}) => {
    if (isEditInterests) return null;
    if (!interests || interests.length < 1) return (
        <p className="pb-4 text-white/50">Add in your interest to find a better match</p>
    );
    return (
        <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
                <span
                    className="bg-white/5 px-4 py-1.5 rounded-full text-white text-sm"
                    key={index}
                >
                    {interest}
                </span>
            ))}
        </div>
    );
};

export default InterestFlexbox;