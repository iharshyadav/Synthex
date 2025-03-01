import React from 'react';
import { motion } from "framer-motion";
import { BackgroundGradient } from "@components/ui/background-gradient";
import { Button } from "@components/ui/moving-border";
import { CheckCircle, XCircle } from 'lucide-react';

interface ContestRulesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

const ContestRulesModal: React.FC<ContestRulesModalProps> = ({ isOpen, onClose, onAccept }) => {
    const rules = [
        {
            title: "Fair Play",
            description: "Maintain integrity and follow all guidelines throughout the contest.",
        },
        {
            title: "No External Help",
            description: "All submissions must be your original work. No third-party assistance allowed.",
        },
        {
            title: "Timely Submission",
            description: "Submit your work before the deadline. Late submissions will not be accepted.",
        },
        {
            title: "Respectful Conduct",
            description: "Maintain professional behavior and respect towards all participants.",
        },
        {
            title: "Resource Guidelines",
            description: "Use only approved resources and tools specified in the contest guidelines.",
        },
    ];

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm py-8 sm:py-10"
        >
            <div className="relative w-full max-w-[95%] md:max-w-[85%] lg:max-w-2xl rounded-[22px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-10 bg-zinc-900/90">
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-center mb-4 sm:mb-6 lg:mb-8"
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Contest Rules</h2>
                <p className="text-sm sm:text-base text-white/60">Please read and accept the following rules before proceeding</p>
            </motion.div>

            <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
                {rules.map((rule, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2.5" />
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{rule.title}</h3>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">{rule.description}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="mt-6 sm:mt-8 flex flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-white/10"
            >
                <Button
                borderRadius="1.5rem"
                className="w-full sm:w-auto bg-zinc-800 text-white flex items-center justify-center space-x-2 hover:bg-zinc-700"
                onClick={onClose}
                >
                <XCircle className="w-4 h-4 sm:w-5 font-semibold sm:h-5" />
                <span className='font-semibold'>Decline</span>
                </Button>
                <Button
                borderRadius="1.5rem"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center space-x-2"
                onClick={onAccept}
                >
                <CheckCircle className="w-4 font-semibold h-4 sm:w-5 sm:h-5" />
                <span className='font-semibold'>Accept Rules</span>
                </Button>
            </motion.div>
            </div>
        </motion.div>
    );
};

// Add this CSS in your global styles
const globalStyles = `
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    @media (min-width: 640px) {
        width: 6px;
    }
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
}
`;

export default ContestRulesModal;
