import React, { useState } from 'react'
import '../../css/jobList.css'
import { AiOutlineClose } from "react-icons/ai";

const JobList = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const jobList = [
        {
            id: 1,
            title: '프론트엔드 개발자',
            company: 'SMARTY',
            location: '경기 분당구 미금',
            type: '정규직',
            description: '최신 리액트 기술을 활용한 웹 애플리케이션 개발',
            tags: ['React', 'JavaScript', 'TypeScript']
        },
        {
            id: 2,
            title: "웹디자이너",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: "정규직",
            description: "사용자 경험을 고려한 웹 디자인 및 UI/UX 개발",
            tags: ["Adobe XD", "Figma", "HTML", "CSS"]
        },
        {
            id: 3,
            title: "웹퍼블리셔",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: "정규직",
            description: "웹 콘텐츠 제작 및 관리, 반응형 웹 구축",
            tags: ["HTML", "CSS", "JavaScript", "jQuery"]
        },
        {
            id: 4,
            title: "백엔드 개발자",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: '정규직',
            description: "서버, 데이터베이스, 애플리케이션 로직 개발",
            tags: ["Node.js", "Express", "MongoDB", "Python"]
        },
        {
            id: 5,
            title: "데이터베이스 관리자",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: "정규직",
            description: "데이터베이스 설계 및 성능 최적화",
            tags: ["MySQL", "SQL"]
        },
        {
            id: 6,
            title: "백엔드 개발자",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: "정규직",
            description: "RESTful API 설계 및 데이터 처리 로직 개발",
            tags: ["Java", "Spring", "AWS", "Docker"]
        },
        {
            id: 7,
            title: "프론트엔드 개발자",
            company: "SMARTY",
            location: '경기 분당구 미금',
            type: "정규직",
            description: "모바일 및 웹 애플리케이션 UI 개발 및 최적화",
            tags: ["Vue.js", "JavaScript", "HTML", "CSS"]
        },
    ]

    // 지원완료 알림창
    const handleApply = (job) => {
        if (appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
            alert('이미 지원한 직무입니다.');
            return;
        }
        setShowNotification(true);
        setAppliedJobs([...appliedJobs, job]);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    // 필터링 
    const filteredJobs = jobList.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || job.tags.includes(selectedCategory))
    );

    return (
        <div className='jobList_container'>
            {showNotification && (
                <div className='showNotificBut' >
                    지원이 완료되었습니다!
                    <AiOutlineClose style={{ width: '30px', height: '30px' }} />
                </div>
            )}
            <div className='jobList_box'>
                <div>
                    <div className='jobList_header'>
                        <h2>SMARTY 채용 정보</h2>
                        <p>최신 기술과 함께 성장할 기회를 찾고 계신가요?</p>
                    </div>
                    <div className='jobList_search'>
                        <input
                            type="text"
                            placeholder="직무 검색으로 쉽게 찾아보세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">전체 기술</option>
                            <option value="React">React</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="TypeScript">TypeScript</option>
                            <option value="Adobe XD">Adobe XD</option>
                            <option value="Figma">Figma</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="jQuery">jQuery</option>
                            <option value="Node.js">Node.js</option>
                            <option value="Express">Express</option>
                            <option value="MongoDB">MongoDB</option>
                            <option value="Python">Python</option>
                            <option value="SQL">SQL</option>
                            <option value="Spring">Spring</option>
                            <option value="MySQL">MySQL</option>
                            <option value="AWS">AWS</option>
                            <option value="Docker">Docker</option>
                            <option value="Vue.js">Vue.js</option>
                        </select>
                    </div>
                </div>
                <div>
                    {filteredJobs.map(job => (
                        <div key={job.id} className='jobCont'>
                            <div>
                                <div>
                                    <h2>{job.title}</h2>
                                    <h5>{job.company}</h5>
                                    <p>{job.description}</p>
                                    <div>
                                        {job.tags.map(tag => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleApply(job)}
                                    disabled={appliedJobs.some(appliedJob => appliedJob.id === job.id)}
                                >
                                    {appliedJobs.some(appliedJob => appliedJob.id === job.id)
                                        ? '지원 완료'
                                        : '지원하기'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default JobList