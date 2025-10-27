import { CommentaryContent } from "../vo/commentary-content.vo";
import { EntityStringId } from "../vo/entity-id.vo";
import { ReportId } from "./report.entity";
import { UserId } from "./user.entity";

export class CommentaryId extends EntityStringId {}

export class CommentaryEntity {
    private _id: CommentaryId;
    private _content: CommentaryContent;
    private _reportId: ReportId;
    private _userId: UserId;
    private _created_at: Date;
    
    constructor(
        id: CommentaryId,
        content: CommentaryContent,
        reportId: ReportId,
        userId: UserId,
        created_at: Date
    ) {
        this._id = id;
        this._content = content;
        this._reportId = reportId;
        this._userId = userId;
        this._created_at = created_at;
    }

    static create(props: {
        content: string;
        reportId: ReportId;
        userId: UserId;
    }): CommentaryEntity {
        const content = new CommentaryContent(props.content);

        return new CommentaryEntity(
            CommentaryId.generate(),
            content,
            props.reportId,
            props.userId,
            new Date()
        );
    }

    static reconstitute(props: {
        id: string;
        content: string;
        reportId: string;
        userId: string;
        createdAt: Date;
    }): CommentaryEntity {
        return new CommentaryEntity(
            new CommentaryId(props.id),
            new CommentaryContent(props.content),
            new ReportId(props.reportId),
            new UserId(props.userId),
            props.createdAt
        );
    }

    public get id(): CommentaryId {
        return this._id;
    }

    public get content(): CommentaryContent {
        return this._content;
    }

    public get report(): ReportId {
        return this._reportId;
    }

    public get user(): UserId {
        return this._userId;
    }

    public get created_at(): Date {
        return this._created_at;
    }
}
