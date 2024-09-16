import { motion, useViewportScroll, useTransform} from "framer-motion";

const Navigation = () => {
  const { scrollY } = useViewportScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 183, 255, 0)", "rgba(0, 183, 255, 1)"]
  );
  const height = useTransform(scrollY, [0, 100], [120, 60]);

  return (
    <motion.div
      id="navigation"
      style={{
        background,
        height
      }}
    >
      <div id="logo" />
      <ul>
        <li />
        <li />
        <li />
      </ul>
    </motion.div>
  );
};



export const FeaturesSection = () => {
  // Animation for the cards
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  // Animation for the lines (using strokeDasharray for the drawing effect)
  const lineVariant = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <div className="relative py-16 bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-600">Our Features</h2>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="relative">
          {/* SVG container for the lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Path from Card 1 to Card 2 */}
            <motion.path
              d="M 200 100 Q 300 150 400 100" // Modify the path based on your layout
              fill="transparent"
              stroke="blue"
              strokeWidth="2"
              variants={lineVariant}
              initial="hidden"
              animate="visible"
            />
            {/* Path from Card 2 to Card 3 */}
            <motion.path
              d="M 400 100 Q 500 150 600 100"
              fill="transparent"
              stroke="blue"
              strokeWidth="2"
              variants={lineVariant}
              initial="hidden"
              animate="visible"
            />
            {/* Add more paths for other connections */}
          </svg>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="p-6 bg-white shadow-lg rounded-lg"
            >
              <h3 className="text-lg font-bold">Privacy Control Features</h3>
              <p className="mt-2">Evaluate candidates with AI-driven interview questions.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="p-6 bg-white shadow-lg rounded-lg"
            >
              <h3 className="text-lg font-bold">AI-Generated Candidate Evaluation</h3>
              <p className="mt-2">AI-driven interview questions and unbiased selection criteria.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="p-6 bg-white shadow-lg rounded-lg"
            >
              <h3 className="text-lg font-bold">Branded Resume Creation</h3>
              <p className="mt-2">Evaluate candidates with AI-driven interview questions.</p>
            </motion.div>

            {/* More cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};




export default Navigation;