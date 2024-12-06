import React from "react";
import "./productStatusLog.css"

const ProductStatusLog = ({ logs, onRestore }) => {
    return (
        <div className="logDetailsContainer">
            <h2>상태 변경 로그</h2>
            {logs.length > 0 ? (
                logs.map((log, index) => (
                    <div key={index} className="logItem">
                        <p>
                            <strong>상태 : </strong> {log.changed_status}
                        </p>
                        <p>
                            <strong>수량 : </strong> {log.change_quantity}
                        </p>
                        <p>
                            <strong>변경 일시: </strong>  {new Date(log.created_at).toLocaleString()}
                        </p>
                        <button
                            className="restoreButton"
                            onClick={() => onRestore(log.status_id)} // 올바른 참조
                        >
                            복구
                        </button>
                    </div>
                ))
            ) : (
                <p>로그가 없습니다.</p>
            )}
        </div>
    )
}

export default ProductStatusLog;
