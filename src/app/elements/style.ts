
export const confidenceBackground = (confidence: number): { background: string } => {
  const fill = '33a853';
  const back = 'daeedd';
  const percent = 100 * confidence / 10;
  return {
    background: `
      linear-gradient(
        90deg, 
        #${fill} 0%, 
        #${fill} ${percent}%,
        #${back} ${percent}%,
        #${back} 100%
      )`
  };
}