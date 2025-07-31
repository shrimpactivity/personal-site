interface ResumeDownloadProps {
  text?: string;
}

const ResumeDownload = (props: ResumeDownloadProps) => {
  return (
    <a href="https://docs.google.com/document/d/1sM6byupCoUqbVF4Oef7dF6Xv0rHhnqHj1pCDQAKvtjs/export?format=pdf">{props.text || "Download Resume"}</a>
  )
}

export default ResumeDownload